import { useRef } from 'react';
import { TestHostEventBusClient } from './TestHostEventBusClient';

export const useTestHostEventBusClient = (): TestHostEventBusClient => {
  const ref = useRef(TestHostEventBusClient.make());
  return ref.current;
};
