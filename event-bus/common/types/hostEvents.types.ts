import { ChannelEvent, UnknownEvent } from '../../@types';

export type HostInitializedEvent = ChannelEvent<'testApp:initialized'>;

// events that HOST receives
export type ToHostErrorHappenedEvent = ChannelEvent<
  `testApp:error-happened`,
  { error: string }
>;

export type ToHostEvent =
  | UnknownEvent
  | HostInitializedEvent
  | ToHostErrorHappenedEvent;

//events that HOST sends
export type FromHostEvent =
  | UnknownEvent
  | HostInitializedEvent;
