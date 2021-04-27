import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CoachStore } from '../root-store';


@NgModule({
  imports:
    [
      CommonModule,
      StoreModule.forFeature(CoachStore.State.coachFeatureKey, CoachStore.Reducers.reducer),
      EffectsModule.forFeature([CoachStore.Effects.CoachEffects])
    ],
  declarations:
    [

    ]
})
export class CoachStoreModule { }
