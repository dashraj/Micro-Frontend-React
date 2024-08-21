import { useRef } from 'react';
import { DomEventBusChannelClient } from '../event-bus/DomEventBusChannelClient';
import { ToHostEvent } from '../event-bus/types';
import { makeChannel } from '../event-bus/EventBusClient';
import { ToMfeEvent } from '../event-bus/types/mfeEvents.types';
import { EVENT_BUS_HOST_INPUT_CHANNEL_NAME } from '../common.constants';

export const useHostInputChannel = (): DomEventBusChannelClient<ToMfeEvent> => {
    const ref = useRef(makeChannel<ToMfeEvent>(EVENT_BUS_HOST_INPUT_CHANNEL_NAME));
    return ref.current;
};
