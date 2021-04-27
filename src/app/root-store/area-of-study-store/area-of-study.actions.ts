import { createAction, props } from '@ngrx/store';
import { AreaOfStudy } from '@gql';


export const requestAreaOfStudyListSilently = createAction
  (
    '[AreaOfStudy] request arera of study list silently'
  );
export const requestAreaOfStudyListFromCareersExplorerTab = createAction
  (
    '[AreaOfStudy] request arera of study list from careers explorer tab'
  );

export const areaOfStudyListReceived = createAction
  (
    '[AreaOfStudy] area of study list received',
    props<{ areaOfStudyList: AreaOfStudy[]; }>()
  );
export const setSelectedAreaOfStudy = createAction
  (
    '[AreaOfStudy] set selected area of study',
    props<{ areaOfStudy: AreaOfStudy; }>()
  );


export const requestAreaOfStudyById = createAction
  (
    '[AreaOfStudy] request area of study by id',
    props<{ areaOfStudyId: string; }>()
  );
export const areaOfStudyReceived = createAction
  (
    '[AreaOfStudy] area of study received',
    props<{ areaOfStudy: AreaOfStudy; }>()
  );
export const requestClearSelectedAreaOfStudy = createAction
  (
    '[AreaOfStudy] request clear selected area of study'
  );


export const areaOfStudyFailure = createAction
  (
    '[AreaOfStudy] area of study failure',
    props<{ error: any; }>()
  );
