import { useRef } from "react";
import { DomEventBusChannelClient } from "../event-bus/DomEventBusChannelClient";
import { makeChannel } from "../event-bus/EventBusClient";
import { EventBusEvent } from "../event-bus/types/eventBusEvents.types";
import { EVENT_BUS_CHANNEL_NAME } from "../common.constants";

export const useEventBusChannel =
  (): DomEventBusChannelClient<EventBusEvent> => {
    const ref = useRef(makeChannel<EventBusEvent>(EVENT_BUS_CHANNEL_NAME));
    return ref.current;
  };
