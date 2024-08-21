import { useRef } from 'react';
import { EVENT_BUS_MFE_OUTPUT_CHANNEL_NAME } from '../common.constants';
import { DomEventBusChannelClient } from '../event-bus/DomEventBusChannelClient';
import { makeChannel } from '../event-bus/EventBusClient';
import { FromHostEvent } from '../event-bus/types/hostEvents.types';

export const useMFEOutputChannel = (): DomEventBusChannelClient<FromHostEvent> => {
    const ref = useRef(makeChannel<FromHostEvent>(EVENT_BUS_MFE_OUTPUT_CHANNEL_NAME));
    return ref.current;
};
