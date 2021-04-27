import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { IRootState, AreaOfStudyStore } from '../root-store';
import { AreaOfStudy } from '@gql';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaOfStudyFacadeService
{

  constructor
    (
      private store: Store<IRootState>
    ) { }


  requestAreaOfStudyById(areaOfStudyId: string)
  {
    return this.store.dispatch(AreaOfStudyStore.Actions.requestAreaOfStudyById({ areaOfStudyId }));
  }

  requestAreaOfStudyListFromCareersExplorerTab()
  {
    return this.store.dispatch(AreaOfStudyStore.Actions.requestAreaOfStudyListFromCareersExplorerTab());
  }

  requestAreaOfStudyListSilently()
  {
    return this.store.dispatch(AreaOfStudyStore.Actions.requestAreaOfStudyListSilently());
  }

  getAreaOfStudyList(): Observable<AreaOfStudy[]>
  {
    return this.store.pipe(select(AreaOfStudyStore.Selectors.getAreaOfStudyList));
  }

  setSelectedAreaOfStudy(areaOfStudy: AreaOfStudy)
  {
    return this.store.dispatch(AreaOfStudyStore.Actions.setSelectedAreaOfStudy({ areaOfStudy }));
  }

  getAreaOfStudy(): Observable<AreaOfStudy>
  {
    return this.store.pipe(select(AreaOfStudyStore.Selectors.getSelectedAreaOfStudy));
  }

  requestClearSelectedAreaOfStudy()
  {
    return this.store.dispatch(AreaOfStudyStore.Actions.requestClearSelectedAreaOfStudy());
  }

}
