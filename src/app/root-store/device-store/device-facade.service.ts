import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { map, filter } from 'rxjs/operators';

import * as fromDeviceActions from './device.actions';
import { DeviceCharacteristics } from './device.state';
import { IRootState, DeviceStore } from '../root-store';


@Injectable({
  providedIn: 'root'
})
export class DeviceFacadeService
{
  constructor
    (
      private store: Store<IRootState>,
      public mediaService: MediaObserver
    )
  {
  }

  monitorDeviceCharacteristics$()
  {
    return this.mediaService.asObservable()
      .pipe
      (
        filter((mediaChanges: MediaChange[]) => true),   // silly noop filter
        map((mediaChanges: MediaChange[]) => this.store.dispatch(fromDeviceActions.requestDeviceState({ mediaChanges })))
      );
  }

  getDeviceCharacteristics$(): Observable<DeviceCharacteristics>
  {
    return this.store.pipe(select(DeviceStore.Selectors.getDeviceState));
  }

}
