import { ChannelEvent, UnknownEvent } from "./ChannelEvent.types";

export type InitializedEvent = ChannelEvent<'initialized'>;
export type CountReceivedEvent = ChannelEvent<
  `count-received`
>;
// events that MFE recieves
export type ToMfeEvent =
  | UnknownEvent
  | InitializedEvent
  | CountReceivedEvent;


// events that MFE sends
export type ErrorHappenedEvent = ChannelEvent<'error-happened', { error: string }>;
export type ToCountCountChangedEvent = ChannelEvent<
  `count-changed`,
  { count: number }
>;

export type FromMfeEvent =
  | UnknownEvent
  | InitializedEvent
  | ErrorHappenedEvent
  | ToCountCountChangedEvent;
