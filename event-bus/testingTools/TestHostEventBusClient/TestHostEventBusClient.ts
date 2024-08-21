import { Subscription, DomEventBus, EventBusClient } from '../../@types';
import { DomEventBusChannelClient } from '../../common/DomEventBusChannelClient';
import { ToHostEvent, FromHostEvent, ToMfeEvent, FromMfeEvent } from '../../common/types';

const eventBus: DomEventBus = new EventTarget();
export const hostInputChannel = DomEventBusChannelClient.make<ToHostEvent>({
  eventBus,
  channel: 'test-host-input-channel',
});
export const hostOutputChannel = DomEventBusChannelClient.make<FromHostEvent>({
  eventBus,
  channel: 'test-host-output-channel',
});
export const mfeInputChannel = DomEventBusChannelClient.make<ToMfeEvent>({
  eventBus,
  channel: 'test-mfe-input-channel',
});
export const mfeOutputChannel = DomEventBusChannelClient.make<FromMfeEvent>({
  eventBus,
  channel: 'test-mfe-output-channel',
});

// NOTE(harunou): TestHostEventBusClient should be used in test to catch and
// emit HOST events
export class TestHostEventBusClient implements EventBusClient<FromHostEvent, ToHostEvent> {
  static make(): TestHostEventBusClient {
    return new TestHostEventBusClient(hostInputChannel, hostOutputChannel);
  }

  constructor(
    private readonly hostInputChannel: DomEventBusChannelClient<ToHostEvent>,
    private readonly hostOutputChannel: DomEventBusChannelClient<FromHostEvent>
  ) {}

  get hasListeners(): boolean {
    return this.hostOutputChannel.hasListeners;
  }

  emit(event: FromHostEvent): void {
    this.hostOutputChannel.emit(event);
  }

  subscribe(listener: (event: ToHostEvent) => void): Subscription {
    return this.hostInputChannel.subscribe((event) => listener(event));
  }
}

// NOTE(harunou): TestMfeEventBusClient should be used in test to catch and
// emit MFE events
export class TestMfeEventBusClient implements EventBusClient<ToMfeEvent, FromMfeEvent> {
  static make(): TestMfeEventBusClient {
    return new TestMfeEventBusClient(mfeInputChannel, mfeOutputChannel);
  }

  constructor(
    private readonly mfeInputChannel: DomEventBusChannelClient<ToMfeEvent>,
    private readonly mfeOutputChannel: DomEventBusChannelClient<FromMfeEvent>
  ) {}

  get hasListeners(): boolean {
    return this.mfeOutputChannel.hasListeners;
  }

  emit(event: ToMfeEvent): void {
    this.mfeInputChannel.emit(event);
  }

  subscribe(listener: (event: FromMfeEvent) => void): Subscription {
    return this.mfeOutputChannel.subscribe((event) => listener(event));
  }
}
