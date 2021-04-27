import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UserProfileStore } from '../root-store';


@NgModule({
  imports:
    [
      CommonModule,
      StoreModule.forFeature(UserProfileStore.State.userProfileFeatureKey, UserProfileStore.Reducers.reducer),
      EffectsModule.forFeature([UserProfileStore.Effects.UserProfileEffects]),
    ],
  declarations:
    [

    ],
})
export class UserProfileStoreModule { }
