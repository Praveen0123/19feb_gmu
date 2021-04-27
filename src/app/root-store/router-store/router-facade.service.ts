import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IRootState } from '../root-store';
import { selectCurrentRoute } from './router.selectors';


@Injectable({
  providedIn: 'root'
})
export class RouterFacadeService
{
  constructor
    (
      private store: Store<IRootState>
    ) { }


  getCurrentRoute(): Observable<any>
  {
    return this.store.pipe(select(selectCurrentRoute));
  }
}
