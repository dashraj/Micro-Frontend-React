export interface ChannelEventWithoutPayload<T extends string = string> {
  type: T;
}

export interface ChannelEventWithPayload<T extends string = string, P = unknown> {
  type: T;
  payload: P;
}

export type ChannelEvent<T extends string | unknown = unknown, P = undefined> = T extends string
  ? P extends undefined
    ? ChannelEventWithoutPayload<T>
    : ChannelEventWithPayload<T, P>
  : unknown;

export type UnknownEvent = ChannelEvent<'unknown'>;
