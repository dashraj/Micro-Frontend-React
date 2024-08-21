import { Subscription } from '../../@types';
import {
  ToHostEventMapper,
  toHostEventMapper,
  ToMfeEventMapper,
  toMfeEventMapper,
} from './mappers';
import { ToMfeEvent, FromMfeEvent } from '../types/mfeEvents.types';
import { DomEventBusChannelClient } from '../DomEventBusChannelClient';
import { HostEventBusClient, ToHostEvent, FromHostEvent } from '../types';
import { HostEventBusClientFake } from '../../testingTools';
import { makeHostInputChannel, makeHostOutputChannel } from './HostDomEventBusClient.utils';
import { isTestMode } from '../common.constants';

export class HostDomEventBusClient implements HostEventBusClient {
  private static instance: HostEventBusClient | null = null;
  static make(): HostEventBusClient {
    if (isTestMode) {
      //  In test environment only a fake of EventBus client is
      // used. The fake is accessible from the tests (see
      // TestHostEventBusClient.ts). New instance of the fake for tests will
      // help to avoid side effects if test are running in parallel
      const fake = HostEventBusClientFake.make();
      fake.setToHostEventMapper(toHostEventMapper);
      fake.setToMfeEventMapper(toMfeEventMapper);
      return fake;
    }

    if (HostDomEventBusClient.instance) {
      return HostDomEventBusClient.instance;
    }

    const hostInputChannel = makeHostInputChannel();
    const hostOutputChannel = makeHostOutputChannel();
    HostDomEventBusClient.instance = new HostDomEventBusClient(
      hostInputChannel,
      hostOutputChannel,
      toHostEventMapper,
      toMfeEventMapper
    );

    return HostDomEventBusClient.instance;
  }

  constructor(
    private readonly hostInputChannel: DomEventBusChannelClient<ToHostEvent>,
    private readonly hostOutputChannel: DomEventBusChannelClient<FromHostEvent>,
    private readonly toHostEventMapper: ToHostEventMapper,
    private readonly toMfeEventMapper: ToMfeEventMapper
  ) { }

  get hasListeners(): boolean {
    return this.hostOutputChannel.hasListeners;
  }

  emit(event: FromMfeEvent): void {
    this.hostInputChannel.emit(this.toHostEventMapper.map(event));
  }

  subscribe(listener: (event: ToMfeEvent) => void): Subscription {
    return this.hostOutputChannel.subscribe((event) => listener(this.toMfeEventMapper.map(event)));
  }
}
