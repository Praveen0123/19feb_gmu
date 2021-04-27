import { createAction, props } from '@ngrx/store';
import { Pathway } from '@gql';

export const requestPathwayListFromPathwayExplorerTab = createAction
  (
    '[Pathway] request pathway list from pathway explorer tab'
  );

export const requestPathwayListFromPathwayDetailsPage = createAction
  (
    '[Pathway] request pathway list from pathway details page'
  );

export const requestPathwayListFromConnectWithCoachPage = createAction
  (
    '[Pathway] request pathway list from connect with coach page'
  );
export const requestFullPathwayList = createAction
  (
    '[Pathway] request full pathway list'
  );
export const requestPathwayListFromAdminPage = createAction
  (
    '[Pathway] request pathway list from admin page'
  );

export const pathwayListReceived = createAction
  (
    '[Pathway] pathway list received',
    props<{ pathwayList: Pathway[]; }>()
  );

export const requestDetailsFromPathwayDetailsPage = createAction
  (
    '[Pathway] request details from pathway details page',
    props<{ pathwayId: string; }>()
  );

export const pathwayDetailsReceived = createAction
  (
    '[Pathway] pathway details received',
    props<{ pathway: Pathway; }>()
  );

export const pathwayFailure = createAction
  (
    '[Pathway] pathway failure',
    props<{ error: any; }>()
  );

export const requestClearSelectedPathway = createAction
  (
    '[Pathway] request clear selected pathway'
  );
