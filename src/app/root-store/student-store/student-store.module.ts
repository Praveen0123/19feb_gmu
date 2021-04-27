import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentStore } from '../root-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(StudentStore.State.studentFeatureKey, StudentStore.Reducers.reducer),
    EffectsModule.forFeature([StudentStore.Effects.StudentEffects])
  ]
})
export class StudentStoreModule { }
