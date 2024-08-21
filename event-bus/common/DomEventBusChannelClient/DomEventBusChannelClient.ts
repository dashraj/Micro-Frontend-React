import { ChannelEvent, DomEventBus, Subscription, SubscriptionListener } from '../../@types';

type CustomEventListener = EventListener;

const makeCustomEventListener = <T extends ChannelEvent = unknown>(
  listener: SubscriptionListener<T>
): CustomEventListener => {
  return (event: Event) => {
    if (event instanceof CustomEvent) {
      listener(event.detail);
    }
  };
};

export class DomEventBusChannelClient<T extends ChannelEvent = unknown> {
  static make<T extends ChannelEvent = unknown>(params: {
    eventBus: DomEventBus;
    channel: string;
  }): DomEventBusChannelClient<T> {
    return new DomEventBusChannelClient(params.eventBus, params.channel);
  }

  private listeners: Map<SubscriptionListener<T>, CustomEventListener> = new Map();

  constructor(
    private readonly eventBus: EventTarget,
    private readonly channel: string
  ) {}

  get hasListeners(): boolean {
    return this.listeners.size > 0;
  }

  emit(event: T): void {
    this.eventBus.dispatchEvent(new CustomEvent(this.channel, { detail: event }));
  }

  subscribe(listener: (event: T) => void): Subscription {
    const customEventListener = makeCustomEventListener<T>(listener);
    this.eventBus.addEventListener(this.channel, customEventListener);
    this.listeners.set(listener, customEventListener);
    return {
      dispose: () => this.dispose(listener),
    };
  }

  dispose(listener?: SubscriptionListener<T>): void {
    if (!listener) {
      this.listeners.forEach((customEventListener) => {
        this.eventBus.removeEventListener(this.channel, customEventListener);
      });
      this.listeners.clear();
      return;
    }
    const customEventListener = this.listeners.get(listener);
    if (customEventListener) {
      this.eventBus.removeEventListener(this.channel, customEventListener);
      this.listeners.delete(listener);
    }
  }
}
