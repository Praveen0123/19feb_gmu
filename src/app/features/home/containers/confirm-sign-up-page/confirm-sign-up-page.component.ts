import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpinnerFacadeService } from '@app/root-store/spinner-store/spinner-facade.service';
import { UserProfileFacadeService } from '@app/root-store/user-profile-store/user-profile-facade.service';
import { ConfirmRegistrationRequest, UserRegistrationResult } from '@app/root-store/user-profile-store/user-profile.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'gmu-confirm-sign-up-page',
  templateUrl: './confirm-sign-up-page.component.html',
  styleUrls: ['./confirm-sign-up-page.component.scss']
})
export class ConfirmSignUpPageComponent implements OnInit, OnDestroy
{
  registrationResults$: Observable<UserRegistrationResult>;
  alive = true;

  constructor(private userProfileFacadeService: UserProfileFacadeService,
    private spinnerService: SpinnerFacadeService) { }

  ngOnInit(): void
  {
    this.registrationResults$ = this.userProfileFacadeService.getRegistrationDetails();
  }

  onConfirm(confirmRegistrationRequest: ConfirmRegistrationRequest)
  {
    this.userProfileFacadeService.requestToConfirmRegistration(confirmRegistrationRequest);
    this.spinnerService.showSpinner();
  }

  ngOnDestroy()
  {
    this.spinnerService.hideSpinner();
  }
}
