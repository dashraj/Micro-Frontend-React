import { Mapper } from '../../../@types';
import { APP } from '../../common.constants';
import { ToHostEvent, FromMfeEvent } from '../../types';

export type ToHostEventMapper = Mapper<FromMfeEvent, ToHostEvent>;

export const toHostEventMapper: ToHostEventMapper = {
  map: (event: FromMfeEvent) => {
    switch (event.type) {
      case 'initialized':
        return {
          ...event,
          type: `${APP}:${event.type}`,
        };
      case 'error-happened':
        return {
          ...event,
          type: `${APP}:${event.type}`,
        };
      case 'unknown': {
        return event;
      }
    }
    //this helps to send any event
    return { type: 'unknown' };
  },
};
