import { EventBusClient } from '../../@types';
import { ToMfeEvent, FromMfeEvent } from './mfeEvents.types';

export type HostEventBusClient = EventBusClient<FromMfeEvent, ToMfeEvent>;
