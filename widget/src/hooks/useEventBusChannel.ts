import { useRef } from "react";
import { DomEventBusChannelClient } from "../event-bus/DomEventBusChannelClient";
import { makeChannel } from "../event-bus/EventBusClient";
import { EVENT_BUS_CHANNEL_NAME } from "../event-bus/common.constants";
import { EventBusEvent } from "../event-bus/types/eventBusEvents.types";

export const useEventBusChannel =
  (): DomEventBusChannelClient<EventBusEvent> => {
    const ref = useRef(makeChannel<EventBusEvent>(EVENT_BUS_CHANNEL_NAME));
    return ref.current;
  };
