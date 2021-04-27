import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthStore } from '../root-store';


@NgModule({
  imports:
    [
      CommonModule,
      StoreModule.forFeature(AuthStore.State.authFeatureKey, AuthStore.Reducers.reducer),
      EffectsModule.forFeature([AuthStore.Effects.AuthEffects])
    ],
  declarations:
    [

    ]
})
export class AuthStoreModule { }
