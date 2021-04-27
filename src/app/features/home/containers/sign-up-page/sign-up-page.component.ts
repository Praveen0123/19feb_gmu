import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileFacadeService } from '@app/root-store/user-profile-store/user-profile-facade.service';
import { UserRegistrationModel } from '@app/root-store/user-profile-store/user-profile.state';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'gmu-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit, OnDestroy
{

  private alive = true;
  constructor(private userProfileFacadeService: UserProfileFacadeService,
    private router: Router) { }

  ngOnInit(): void
  {
    this.userProfileFacadeService.getRegistrationDetails().pipe(takeWhile(() => this.alive)).subscribe(
      (action) =>
      {
        if (action?.userName)
        {
          const userName = action?.userName;
          this.router.navigate(['/home/confirm-registration'], { state: { userName: action.userName } });
        }
      }
    );
  }

  ngOnDestroy(): void
  {
    this.alive = false;
  }

  onFormSubmit(userRegistration: UserRegistrationModel)
  {
    this.userProfileFacadeService.requestToSaveUserRegistrationForm(userRegistration);
  }
}
