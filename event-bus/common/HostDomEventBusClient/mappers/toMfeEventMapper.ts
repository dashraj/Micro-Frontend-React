import { Mapper } from '../../../@types';
import { APP } from '../../common.constants';
import { FromHostEvent } from '../../types';
import { ToMfeEvent } from '../../types/mfeEvents.types';

export type ToMfeEventMapper = Mapper<FromHostEvent, ToMfeEvent>;

export const toMfeEventMapper: ToMfeEventMapper = {
  map: (event: FromHostEvent) => {
    switch (event.type) {
      case `${APP}:initialized`:
        return {
          ...event,
          type: 'initialized',
        };
      case 'unknown':
        return event;
    }
    //this helps to receive any event
    return { type: 'unknown' };
  },
};
