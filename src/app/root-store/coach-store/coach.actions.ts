import { Coach } from '@gql';
import { createAction, props } from '@ngrx/store';
import { RecentSearchModel } from './coach.state';


export const requestCoachRecentSearchesByStudentId = createAction
  (
    '[Coach] request Coach Recent Search Details By Student Id',
    props<{ studentId: string; }>()
  );


export const coachRecentSearchesReceived = createAction(
  '[Coach] recent Searches Received From Server',
  props<{ recentSearches: RecentSearchModel[]; }>()
);

export const coachSearchReceived = createAction(
  '[Coach] recent search received',
  props<{ search: RecentSearchModel; }>()
);

export const requestClearCoachRecentSearch = createAction
  (
    '[Coach] request to Clear Coach Recent Search'
  );

export const coachRecentSearchesFailure = createAction(
  '[ Coach ] coach recent searches failure',
  props<{ error: any; }>()
);

export const requestCoachList = createAction
  (
    '[Coach] Request Coach List'
  );

export const coachListReceived = createAction
  (
    '[Coach] Coach List Received',
    props<{ coachList: Coach[]; }>()
  );

export const clearCoachList = createAction(
  '[Coach] Clear Coach List'
);

export const coachFailure = createAction(
  '[Coach] Coach Failure',
  props<{ error: any; }>()
);
