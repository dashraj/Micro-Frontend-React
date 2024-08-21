import { useRef } from 'react';
import { FromHostEvent } from '../event-bus/types';
import { DomEventBusChannelClient } from '../event-bus/DomEventBusChannelClient';
import { makeChannel } from '../event-bus/EventBusClient';
import { FromMfeEvent } from '../event-bus/types/mfeEvents.types';
import { EVENT_BUS_HOST_OUTPUT_CHANNEL_NAME } from '../common.constants';

export const useHostOutputChannel = (): DomEventBusChannelClient<FromMfeEvent> => {
    const ref = useRef(makeChannel<FromMfeEvent>(EVENT_BUS_HOST_OUTPUT_CHANNEL_NAME));
    return ref.current;
};
