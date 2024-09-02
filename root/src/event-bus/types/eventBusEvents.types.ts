import { ChannelEvent, UnknownEvent } from "./ChannelEvent.types";

//events that Host sends
export type HostInitializedEvent = ChannelEvent<"host:initialized">;
export type CountReceivedEvent = ChannelEvent<`host:count-received`>;

// events that host receives
export type MfeInitializedEvent = ChannelEvent<"mfe:initialized">;
export type ErrorHappenedEvent = ChannelEvent<
  "mfe:error-happened",
  { error: string }
>;
export type CountChangedEvent = ChannelEvent<
  `mfe:count-changed`,
  { count: number }
>;

export type EventBusEvent =
  | UnknownEvent
  | HostInitializedEvent
  | MfeInitializedEvent
  | CountChangedEvent
  | CountReceivedEvent
  | ErrorHappenedEvent;
