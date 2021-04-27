import { Injectable } from '@angular/core';
import { Coach } from '@gql';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IRootState, CoachStore } from '../root-store';
import { getCoachList, getCoachRecentSearchesList } from './coach.selectors';
import { RecentSearchModel } from './coach.state';



@Injectable({
  providedIn: 'root'
})
export class CoachFacadeService
{

  constructor
    (
      private store: Store<IRootState>
    ) { }


  requestCoachList()
  {
    return this.store.dispatch(CoachStore.Actions.requestCoachList());
  }

  clearCoachList()
  {
    return this.store.dispatch(CoachStore.Actions.clearCoachList());
  }

  getCoachList(): Observable<Coach[]>
  {
    return this.store.pipe(select(getCoachList));
  }

  requestCoachRecentSearches()
  {
    console.log('requested searches');
    return this.store.pipe(select(getCoachRecentSearchesList));
  }
  requestClearRecentSearches()
  {
    return this.store.dispatch(CoachStore.Actions.requestClearCoachRecentSearch());
  }

  addSearchHistory(search: RecentSearchModel)
  {
    return this.store.dispatch(CoachStore.Actions.coachSearchReceived({ search }));
  }
}
