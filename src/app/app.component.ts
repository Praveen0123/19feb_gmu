import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { takeWhile, map } from 'rxjs/operators';

import { NgxSpinnerService } from 'ngx-spinner';

import { environment } from '@env/environment';
import { CustomIconRegistryService } from './core/services/custom-icon-registry/custom-icon-registry.service';
import { DeviceFacadeService } from './root-store/device-store/device-facade.service';
import { DeviceCharacteristics } from './root-store/device-store/device.state';
import { SpinnerFacadeService } from './root-store/spinner-store/spinner-facade.service';
import { UserProfileFacadeService } from './root-store/user-profile-store/user-profile-facade.service';
import { UserDetails } from './root-store/user-profile-store/user-profile.state';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';

@Component({
  selector: 'gmu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy
{
  private alive = true;
  private timer = null;
  timedOut = false;
  private loggedIn = false;
  private subscription: Subscription;


  deviceCharacteristics$: Observable<DeviceCharacteristics>;
  userDetails$: Observable<UserDetails>;
  constructor
    (
      private customIconRegistryService: CustomIconRegistryService,
      private deviceFacadeService: DeviceFacadeService,
      private spinnerFacadeService: SpinnerFacadeService,
      private userProfileFacadeService: UserProfileFacadeService,
      private spinner: NgxSpinnerService,
      private idle: Idle
    )
  {
    this.customIconRegistryService.init();
  }

  ngOnInit(): void
  {
    this.deviceFacadeService.monitorDeviceCharacteristics$().pipe(takeWhile(() => this.alive)).subscribe();
    this.deviceCharacteristics$ = this.deviceFacadeService.getDeviceCharacteristics$();
    this.userDetails$ = this.userProfileFacadeService.getUserDetails();
    this.subscription = this.userProfileFacadeService.getUserDetails().subscribe(
      (userDetails) => { this.loggedIn = userDetails != null; }
    );

    this.idle.setIdle(5);
    this.idle.setTimeout(1800);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => this.reset());
    this.idle.onTimeout.subscribe(() =>
    {
      if (this.loggedIn)
      {
        this.signOut();
      }
      this.reset();
    });
    this.reset();
    // establish user profile
    this.userProfileFacadeService.createUserProfile();


    // MONITOR SPINNER COUNT
    this.spinnerFacadeService.getSpinnerCount()
      .pipe
      (
        takeWhile(() => this.alive),
        map((spinnerCount: number) =>
        {
          clearTimeout(this.timer);

          this.timer = setTimeout(() =>
          {
            if (spinnerCount !== 0)
            {
              this.showSpinner();
            }
            else
            {
              this.hideSpinner();
            }
          }, (spinnerCount !== 0) ? 0 : 300);

        })
      ).subscribe();
  }

  reset()
  {
    this.idle.watch();
    this.timedOut = false;
  }
  ngOnDestroy(): void
  {
    this.alive = false;
    this.subscription.unsubscribe();
  }

  private showSpinner()
  {
    this.spinner.show(undefined,
      {
        bdColor: 'rgba(51,51,51,0.8)',
        color: 'white',
        fullScreen: true,
        size: 'large',
        type: 'square-jelly-box'
      }
    );
  }

  private hideSpinner()
  {
    this.spinner.hide();
  }

  signOut()
  {
    this.userProfileFacadeService.signOut();
  }
}
