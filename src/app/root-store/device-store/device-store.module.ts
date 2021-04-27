import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { DeviceStore } from '../root-store';


@NgModule({
  imports:
    [
      CommonModule,
      StoreModule.forFeature(DeviceStore.State.deviceFeatureKey, DeviceStore.Reducers.reducer),
      EffectsModule.forFeature([DeviceStore.Effects.DeviceEffects])
    ],
  declarations:
    [

    ]
})
export class DeviceStoreModule { }
