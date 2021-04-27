import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ConnectWithCoachStore } from '../root-store';


@NgModule({
  imports:
    [
      CommonModule,
      StoreModule.forFeature(ConnectWithCoachStore.State.connectCoachFeatureKey, ConnectWithCoachStore.Reducers.reducer),
      EffectsModule.forFeature([ConnectWithCoachStore.Effects.ConnectWithCoachEffects]),
    ],
  declarations:
    [

    ],
})
export class ConnectWithCoachStoreModule { }
