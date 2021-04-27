import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { storageSync } from '@larscom/ngrx-store-storagesync';

import * as AreaOfStudyStore from './area-of-study-store';
import * as ConnectWithCoachStore from './connect-with-coach-store';
import * as DeviceStore from './device-store';
import * as OccupationStore from './occupation-store';
import * as PathwayStore from './pathway-store';
import * as SpinnerStore from './spinner-store';
import * as UserProfileStore from './user-profile-store';
import * as StudentStore from './student-store';
import * as CoachStore from './coach-store';
// import * as AuthStore from './auth-store';
import * as SkillsRoadmapStore from './student-skills-roadmap-store';
import * as StudentProfileStore from './student-profile-store';


export interface IRootState
{
  router: any;
  [AreaOfStudyStore.State.areaOfStudyFeatureKey]: AreaOfStudyStore.State.AreaOfStudyState;
  //  [AuthStore.State.authFeatureKey]: AuthStore.State.AuthState;
  [CoachStore.State.coachFeatureKey]: CoachStore.State.CoachState;
  [ConnectWithCoachStore.State.connectCoachFeatureKey]: ConnectWithCoachStore.State.ConnectCoachState;
  [DeviceStore.State.deviceFeatureKey]: DeviceStore.State.DeviceState;
  [OccupationStore.State.occupationFeatureKey]: OccupationStore.State.OccupationState;
  [PathwayStore.State.pathwayFeatureKey]: PathwayStore.State.PathwayState;
  [SpinnerStore.State.spinnerFeatureKey]: SpinnerStore.State.SpinnerState;
  [UserProfileStore.State.userProfileFeatureKey]: UserProfileStore.State.UserProfileState;
  [StudentStore.State.studentFeatureKey]: StudentStore.State.StudentState;
  [SkillsRoadmapStore.State.skillsRoadmapFeatureKey]: SkillsRoadmapStore.State.SkillsRoadmapState;
  [StudentProfileStore.State.studentProfileFeatureKey]: StudentProfileStore.State.StudentProfileState;
}

export
{
  AreaOfStudyStore,
  //  AuthStore,
  CoachStore,
  ConnectWithCoachStore,
  DeviceStore,
  OccupationStore,
  PathwayStore,
  SpinnerStore,
  UserProfileStore,
  StudentStore,
  SkillsRoadmapStore,
  StudentProfileStore
};

export const reducers: ActionReducerMap<IRootState> =
{
  router: routerReducer,
  [AreaOfStudyStore.State.areaOfStudyFeatureKey]: AreaOfStudyStore.Reducers.reducer,
  //  [AuthStore.State.authFeatureKey]: AuthStore.Reducers.reducer,
  [CoachStore.State.coachFeatureKey]: CoachStore.Reducers.reducer,
  [ConnectWithCoachStore.State.connectCoachFeatureKey]: ConnectWithCoachStore.Reducers.reducer,
  [DeviceStore.State.deviceFeatureKey]: DeviceStore.Reducers.reducer,
  [OccupationStore.State.occupationFeatureKey]: OccupationStore.Reducers.reducer,
  [PathwayStore.State.pathwayFeatureKey]: PathwayStore.Reducers.reducer,
  [SpinnerStore.State.spinnerFeatureKey]: SpinnerStore.Reducers.reducer,
  [UserProfileStore.State.userProfileFeatureKey]: UserProfileStore.Reducers.reducer,
  [StudentStore.State.studentFeatureKey]: StudentStore.Reducers.reducer,
  [SkillsRoadmapStore.State.skillsRoadmapFeatureKey]: SkillsRoadmapStore.Reducers.reducer,
  [StudentProfileStore.State.studentProfileFeatureKey]: StudentProfileStore.Reducers.reducer,
};

// slices of state participating in session/local storage persistance
export function storageSyncReducer(reducer: ActionReducer<IRootState>)
{
  return storageSync<IRootState>({
    features:
      [
        { stateKey: OccupationStore.State.occupationFeatureKey, storageForFeature: window.sessionStorage },
        { stateKey: PathwayStore.State.pathwayFeatureKey, storageForFeature: window.sessionStorage },
        { stateKey: UserProfileStore.State.userProfileFeatureKey, storageForFeature: window.localStorage }
      ],
    // defaults to localStorage
    storage: window.localStorage
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [storageSyncReducer];
