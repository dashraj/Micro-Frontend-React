import { useRef } from 'react';
import { TestMfeEventBusClient } from './TestHostEventBusClient';

export const useTestMfeEventBusClient = (): TestMfeEventBusClient => {
  const ref = useRef(TestMfeEventBusClient.make());
  return ref.current;
};
