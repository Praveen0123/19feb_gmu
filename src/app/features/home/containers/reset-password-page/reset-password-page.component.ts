import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserProfileFacadeService } from '@app/root-store/user-profile-store/user-profile-facade.service';
import { RequestType, ResetPasswordCodeResult, ResetPasswordRequest, UserRegistrationResult } from '@app/root-store/user-profile-store/user-profile.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'gmu-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss']
})
export class ResetPasswordPageComponent implements OnInit, OnDestroy
{

  resetResults$: Observable<ResetPasswordCodeResult>;
  constructor(private userProfileFacadeService: UserProfileFacadeService) { }

  ngOnInit(): void
  {
    this.resetResults$ = this.userProfileFacadeService.getPasswordResetDetails();
  }

  ngOnDestroy()
  {
    this.userProfileFacadeService.clearResetDetails();
  }
  onSubmit(resetPasswordRequest: ResetPasswordRequest)
  {
    switch (resetPasswordRequest.requestType)
    {
      case RequestType.RESET_PASSWORD:
        this.userProfileFacadeService.resetPasswordRequest(resetPasswordRequest);
        break;
      case RequestType.REQUEST_CODE:
        this.userProfileFacadeService.resetPasswordCodeRequest(resetPasswordRequest.emailAddress);
        break;
    }
  }
}
