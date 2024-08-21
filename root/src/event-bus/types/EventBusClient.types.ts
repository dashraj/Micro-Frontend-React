import { ChannelEvent } from './ChannelEvent.types';
import { Subscription } from './Subscription.types';

export type DomEventBus = EventTarget;

export interface EventBusClient<
  TEmitEvent extends ChannelEvent = unknown,
  TSubscribeEvent extends ChannelEvent = unknown,
> {
  hasListeners: boolean;
  emit(event: TEmitEvent): void;
  subscribe(listener: (event: TSubscribeEvent) => void): Subscription;
}
