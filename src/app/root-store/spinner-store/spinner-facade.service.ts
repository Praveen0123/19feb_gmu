import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IRootState, SpinnerStore } from '../root-store';
import { getSpinnerCount } from './spinner.selectors';


@Injectable({
  providedIn: 'root'
})
export class SpinnerFacadeService
{

  constructor
    (
      private store: Store<IRootState>
    ) { }


  showSpinner()
  {
    return this.store.dispatch(SpinnerStore.Actions.showSpinner());
  }

  hideSpinner()
  {
    return this.store.dispatch(SpinnerStore.Actions.hideSpinner());
  }

  getSpinnerCount(): Observable<number>
  {
    return this.store.pipe(select(getSpinnerCount));
  }

}
