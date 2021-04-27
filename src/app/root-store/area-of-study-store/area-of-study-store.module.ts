import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AreaOfStudyStore } from '../root-store';


@NgModule({
  imports:
    [
      CommonModule,
      StoreModule.forFeature(AreaOfStudyStore.State.areaOfStudyFeatureKey, AreaOfStudyStore.Reducers.reducer),
      EffectsModule.forFeature([AreaOfStudyStore.Effects.AreaOfStudyEffects])
    ],
  declarations:
    [

    ]
})
export class AreaOfStudyStoreModule { }
