import { DomEventBus } from '../../@types';
import {
  EVENT_BUS_HOST_INPUT_CHANNEL_NAME,
  EVENT_BUS_HOST_OUTPUT_CHANNEL_NAME,
  EVENT_BUS_SELECTOR,
  isTestMode,
} from '../common.constants';
import { DomEventBusChannelClient } from '../DomEventBusChannelClient';
import { FromHostEvent, ToHostEvent } from '../types';

const fakeEventBus: DomEventBus = new EventTarget();

const getEventBus = (): DomEventBus => {
  if (isTestMode) {
    return fakeEventBus;
  }

  const eventBus: DomEventBus | null = document.querySelector(EVENT_BUS_SELECTOR);

  if (!eventBus) {
    throw new Error(`Element with selector "${EVENT_BUS_SELECTOR}" not found`);
  }

  return eventBus;
};

export const makeHostOutputChannel = (): DomEventBusChannelClient<FromHostEvent> => {
  const eventBus = getEventBus();

  return DomEventBusChannelClient.make<FromHostEvent>({
    eventBus,
    channel: EVENT_BUS_HOST_OUTPUT_CHANNEL_NAME,
  });
};

export const makeHostInputChannel = (): DomEventBusChannelClient<ToHostEvent> => {
  const eventBus = getEventBus();

  return DomEventBusChannelClient.make<ToHostEvent>({
    eventBus,
    channel: EVENT_BUS_HOST_INPUT_CHANNEL_NAME,
  });
};
