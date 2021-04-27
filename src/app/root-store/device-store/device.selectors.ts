import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromDeviceState from './device.state';


// RETRIEVE TOOLTIP SLICE OF STATE
export const deviceSlice: MemoizedSelector<object, fromDeviceState.DeviceState> =
  createFeatureSelector<fromDeviceState.DeviceState>(fromDeviceState.deviceFeatureKey);


// GET DEVICE STATE
export const getDeviceState: MemoizedSelector<object, fromDeviceState.DeviceCharacteristics> =
  createSelector
    (
      deviceSlice,
      (state): fromDeviceState.DeviceCharacteristics => state.deviceCharacteristics
    );
