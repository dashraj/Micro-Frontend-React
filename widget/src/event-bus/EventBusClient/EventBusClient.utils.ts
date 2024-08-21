import { DomEventBusChannelClient } from '../DomEventBusChannelClient';
import { DomEventBus } from '../types/EventBusClient.types';


const getEventBus = (eventBusSelector?: string): DomEventBus => {

  const eventBus: DomEventBus | null = document.querySelector(eventBusSelector || 'event-bus') || document;

  if (!eventBus) {
    throw new Error(`Element with selector "${eventBusSelector}" not found`);
  }

  return eventBus;
};

export function makeChannel<T>(channelName: string, eventBusSelector?: string): DomEventBusChannelClient<T> {
  const eventBus = getEventBus(eventBusSelector);

  return DomEventBusChannelClient.make<T>({
    eventBus,
    channel: channelName,
  });
};
