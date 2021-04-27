import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StudentProfileStore } from '../root-store';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(StudentProfileStore.State.studentProfileFeatureKey, StudentProfileStore.Reducers.reducer),
    EffectsModule.forFeature([StudentProfileStore.Effects.StudentProfileEffects])
  ]
})
export class StudentProfileStoreModule { }
