import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsRoadmapStore } from '../root-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(SkillsRoadmapStore.State.skillsRoadmapFeatureKey, SkillsRoadmapStore.Reducers.reducer),
    EffectsModule.forFeature([SkillsRoadmapStore.Effects.SkillsRoadmapEffects])
  ]
})
export class SkillsRoadmaptStoreModule { }
