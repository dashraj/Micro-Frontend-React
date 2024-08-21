import { useRef } from 'react';
import { EVENT_BUS_MFE_INPUT_CHANNEL_NAME } from '../common.constants';
import { DomEventBusChannelClient } from '../event-bus/DomEventBusChannelClient';
import { makeChannel } from '../event-bus/EventBusClient';
import { ToHostEvent } from '../event-bus/types/hostEvents.types';

export const useMFEInputChannel = (): DomEventBusChannelClient<ToHostEvent> => {
    const ref = useRef(makeChannel<ToHostEvent>(EVENT_BUS_MFE_INPUT_CHANNEL_NAME));
    return ref.current;
};
