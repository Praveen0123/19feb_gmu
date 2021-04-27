import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IRootState, PathwayStore } from '../root-store';
import { Pathway } from '@gql';


@Injectable({
  providedIn: 'root',
})
export class PathwayFacadeService
{

  constructor
    (
      private store: Store<IRootState>
    ) { }


  requestPathwayListFromPathwayExplorerTab()
  {
    return this.store.dispatch(PathwayStore.Actions.requestPathwayListFromPathwayExplorerTab());
  }

  requestPathwayListFromPathwayDetailsPage()
  {
    return this.store.dispatch(PathwayStore.Actions.requestPathwayListFromPathwayDetailsPage());
  }

  requestPathwayListFromConnectWithCoachPage()
  {
    return this.store.dispatch(PathwayStore.Actions.requestPathwayListFromConnectWithCoachPage());
  }

  requestFullPathwayList()
  {
    return this.store.dispatch(PathwayStore.Actions.requestFullPathwayList());
  }

  requestPathwayListFromAdminPage()
  {
    return this.store.dispatch(PathwayStore.Actions.requestPathwayListFromAdminPage());
  }

  requestDetailsFromPathwayDetailsPage(pathwayId: string)
  {
    return this.store.dispatch(PathwayStore.Actions.requestDetailsFromPathwayDetailsPage({ pathwayId }));
  }

  getPathwayList(): Observable<Pathway[]>
  {
    return this.store.pipe(select(PathwayStore.Selectors.getPathwayList));
  }

  getPathway(): Observable<Pathway>
  {
    return this.store.pipe(select(PathwayStore.Selectors.getPathway));
  }

  requestClearSelectedPathway()
  {
    return this.store.dispatch(PathwayStore.Actions.requestClearSelectedPathway());
  }

}
