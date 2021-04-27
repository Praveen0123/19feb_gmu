import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PathwayStore } from '../root-store';


@NgModule({
  imports:
    [
      CommonModule,
      StoreModule.forFeature(PathwayStore.State.pathwayFeatureKey, PathwayStore.Reducers.reducer),
      EffectsModule.forFeature([PathwayStore.Effects.PathwayEffects])
    ],
  declarations:
    [

    ]
})
export class PathwayStoreModule { }
