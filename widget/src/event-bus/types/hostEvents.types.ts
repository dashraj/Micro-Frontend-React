import { ChannelEvent, UnknownEvent } from "./ChannelEvent.types";

export type HostInitializedEvent = ChannelEvent<'initialized'>;

// events that HOST receives
export type ToHostErrorHappenedEvent = ChannelEvent<
  `error-happened`,
  { error: string }
>;

export type ToHostCountChangedEvent = ChannelEvent<
  `count-changed`,
  { count: number }
>;

export type ToHostEvent =
  | UnknownEvent
  | HostInitializedEvent
  | ToHostErrorHappenedEvent
  | ToHostCountChangedEvent;

//events that HOST sends
export type FromHostEvent =
  | UnknownEvent
  | HostInitializedEvent;
