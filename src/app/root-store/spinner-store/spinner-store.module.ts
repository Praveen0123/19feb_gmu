import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SpinnerStore } from '../root-store';


@NgModule({
  imports:
    [
      CommonModule,
      StoreModule.forFeature(SpinnerStore.State.spinnerFeatureKey, SpinnerStore.Reducers.reducer),
      EffectsModule.forFeature([SpinnerStore.Effects.SpinnerEffects])
    ],
  declarations:
    [

    ]
})
export class SpinnerStoreModule { }
