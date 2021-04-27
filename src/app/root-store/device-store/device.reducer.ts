import { createReducer, on } from '@ngrx/store';

import * as fromDeviceActions from './device.actions';
import * as fromDeviceState from './device.state';


export const reducer = createReducer
  (
    fromDeviceState.initialDeviceState,
    on(fromDeviceActions.deviceStateReceived, (state, { deviceCharacteristics }) =>
    {
      return { ...state, deviceCharacteristics };
    })
  );
