import { createAction, props } from '@ngrx/store';
import { MediaChange } from '@angular/flex-layout';

import * as fromDeviceState from './device.state';

export const requestDeviceState = createAction
  (
    '[Device] Request Device State',
    props<{ mediaChanges: MediaChange[]; }>()
  );

export const deviceStateReceived = createAction
  (
    '[Device] Device State Received',
    props<{ deviceCharacteristics: fromDeviceState.DeviceCharacteristics; }>()
  );

export const deviceStateFailure = createAction
  (
    '[Device] Device State Failure',
    props<{ error: any; }>()
  );
