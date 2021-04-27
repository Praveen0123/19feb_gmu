import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { entityConfig, defaultDataServiceConfig } from './entity-metadata';
import { devToolsInstrument } from './_build-specifics';


// modules for different slices of store...
import { reducers, metaReducers } from './root-store';
import { ConnectWithCoachStoreModule } from './connect-with-coach-store/connect-with-coach-store.module';
import { DeviceStoreModule } from './device-store/device-store.module';
import { OccupationStoreModule } from './occupation-store/occupation-store.module';
import { PathwayStoreModule } from './pathway-store/pathway-store.module';
import { UserProfileStoreModule } from './user-profile-store/user-profile-store.module';
import { AreaOfStudyStoreModule } from './area-of-study-store/area-of-study-store.module';
import { SpinnerStoreModule } from './spinner-store/spinner-store.module';
import { StudentStoreModule } from './student-store/student-store.module';
import { CoachStoreModule } from './coach-store/coach-store.module';
import { SkillsRoadmaptStoreModule } from './student-skills-roadmap-store/skills-roadmap-store.module';
import { StudentProfileStoreModule } from './student-profile-store/student-profile-store.module';

@NgModule({
  imports:
    [
      CommonModule,

      // STATE
      StoreModule.forRoot(reducers,
        {
          metaReducers,
          runtimeChecks:
          {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),

      EffectsModule.forRoot([]),
      EntityDataModule.forRoot(entityConfig),
      devToolsInstrument,
      StoreRouterConnectingModule.forRoot(),

      // modules for different slices of store...
      ConnectWithCoachStoreModule,
      DeviceStoreModule,
      OccupationStoreModule,
      PathwayStoreModule,
      UserProfileStoreModule,
      AreaOfStudyStoreModule,
      SpinnerStoreModule,
      StudentStoreModule,
      CoachStoreModule,
      SkillsRoadmaptStoreModule,
      StudentProfileStoreModule
    ],
  declarations:
    [

    ],
  providers:
    [
      { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
    ],
})
export class RootStoreModule { }
