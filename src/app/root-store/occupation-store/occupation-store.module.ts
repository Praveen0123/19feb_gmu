import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { OccupationStore } from '../root-store';


@NgModule({
  imports:
    [
      CommonModule,
      StoreModule.forFeature(OccupationStore.State.occupationFeatureKey, OccupationStore.Reducers.reducer),
      EffectsModule.forFeature([OccupationStore.Effects.OccupationEffects])
    ],
  declarations:
    [

    ]
})
export class OccupationStoreModule { }
