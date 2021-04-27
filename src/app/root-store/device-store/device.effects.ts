import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MediaObserver } from '@angular/flex-layout';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import device from 'current-device';

import * as fromDeviceActions from './device.actions';
import * as fromDeviceState from './device.state';


@Injectable()
export class DeviceEffects
{
  constructor
    (
      private actions$: Actions,
      private mediaService: MediaObserver
    ) { }


  requestDeviceState$ = createEffect(() => this.actions$.pipe
    (
      ofType(fromDeviceActions.requestDeviceState),
      map((action) =>
      {
        const currentDevice: any = device.noConflict();

        const deviceCharacteristics: fromDeviceState.DeviceCharacteristics =
        {
          deviceWidth: (window) ? window.innerWidth : undefined,
          deviceHeight: (window) ? window.innerHeight : undefined,

          isExtraSmall: this.mediaService.isActive('xs'),
          isSmall: this.mediaService.isActive('sm'),
          isMedium: this.mediaService.isActive('md'),
          isLarge: this.mediaService.isActive('lg'),
          isExtraLarge: this.mediaService.isActive('xl'),

          isLessThanSmall: this.mediaService.isActive('lt-sm'),
          isLessThanMedium: this.mediaService.isActive('lt-md'),
          isLessThanLarge: this.mediaService.isActive('lt-lg'),
          isLessThanExtraLarge: this.mediaService.isActive('lt-xl'),

          isGreaterThanExtraSmall: this.mediaService.isActive('gt-xs'),
          isGreaterThanSmall: this.mediaService.isActive('gt-sm'),
          isGreaterThanMedium: this.mediaService.isActive('gt-md'),
          isGreaterThanLarge: this.mediaService.isActive('gt-lg'),

          isLandscape: this.mediaService.isActive('landscape'),
          isPortrait: this.mediaService.isActive('portrait'),
          isRetina2: this.mediaService.isActive('retina2'),
          isRetina3: this.mediaService.isActive('retina3'),
          isMobile: (currentDevice.ios() || currentDevice.android()),
          isDesktop: currentDevice.desktop(),
          isStandalone: this.mediaService.isActive('standalone')
        };

        // console.log('DEVICE CHARACTERISTICS', deviceCharacteristics);

        return fromDeviceActions.deviceStateReceived({ deviceCharacteristics });
      }),
      catchError(error => of(fromDeviceActions.deviceStateFailure({ error })))
    )
  );

}
