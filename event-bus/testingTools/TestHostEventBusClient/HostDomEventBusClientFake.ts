import { Subscription } from '../../@types';
import { DomEventBusChannelClient } from '../../common/DomEventBusChannelClient';
import { ToHostEventMapper, ToMfeEventMapper } from '../../common/HostDomEventBusClient';
import {
  FromHostEvent,
  FromMfeEvent,
  HostEventBusClient,
  ToHostEvent,
  ToMfeEvent,
} from '../../common/types';
import {
  hostInputChannel,
  hostOutputChannel,
  mfeInputChannel,
  mfeOutputChannel,
} from './TestHostEventBusClient';

export class HostEventBusClientFake implements HostEventBusClient {
  static make(): HostEventBusClientFake {
    const defaultToHostEventMapper: ToHostEventMapper = {
      map: (event) => event as ToHostEvent,
    };
    const defaultToMfeEventMapper: ToMfeEventMapper = {
      map: (event) => event as ToMfeEvent,
    };

    return new HostEventBusClientFake(
      hostInputChannel,
      hostOutputChannel,
      mfeInputChannel,
      mfeOutputChannel,
      defaultToHostEventMapper,
      defaultToMfeEventMapper
    );
  }
  constructor(
    private readonly hostInputChannel: DomEventBusChannelClient<ToHostEvent>,
    private readonly hostOutputChannel: DomEventBusChannelClient<FromHostEvent>,
    private readonly mfeInputChannel: DomEventBusChannelClient<ToMfeEvent>,
    private readonly mfeOutputChannel: DomEventBusChannelClient<FromMfeEvent>,
    private toHostEventMapper?: ToHostEventMapper,
    private toMfeEventMapper?: ToMfeEventMapper
  ) {}

  get hasListeners(): boolean {
    return this.hostOutputChannel.hasListeners;
  }

  setToHostEventMapper(toHostEventMapper: ToHostEventMapper): void {
    this.toHostEventMapper = toHostEventMapper;
  }

  setToMfeEventMapper(toMfeEventMapper: ToMfeEventMapper): void {
    this.toMfeEventMapper = toMfeEventMapper;
  }

  emit(event: FromMfeEvent): void {
    const mappedEvent: ToHostEvent = this.toHostEventMapper
      ? this.toHostEventMapper.map(event)
      : { type: 'unknown' };
    this.hostInputChannel.emit(mappedEvent);
    this.mfeOutputChannel.emit(event);
  }

  subscribe(listener: (event: ToMfeEvent) => void): Subscription {
    const hostSubscription = this.hostOutputChannel.subscribe((event) => {
      const mappedEvent: ToMfeEvent = this.toMfeEventMapper
        ? this.toMfeEventMapper.map(event)
        : { type: 'unknown' };
      listener(mappedEvent);
    });
    const mfeSubscription = this.mfeInputChannel.subscribe((event) => listener(event));
    return {
      dispose: () => {
        hostSubscription.dispose();
        mfeSubscription.dispose();
      },
    };
  }
}
