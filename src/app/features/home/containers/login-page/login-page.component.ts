import { Component, OnInit } from '@angular/core';
import { UserProfileFacadeService } from '@app/root-store/user-profile-store/user-profile-facade.service';
import { UserLoginModel } from '@app/root-store/user-profile-store/user-profile.state';

@Component({
  selector: 'gmu-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit
{

  constructor(
    private userProfileFacadeService: UserProfileFacadeService
  ) { }

  ngOnInit(): void
  {
    this.userProfileFacadeService.clearResetDetails();
  }

  onLoginFormSubmit(userLoginData: UserLoginModel)
  {
    this.userProfileFacadeService.requestToSaveUserLoginForm(userLoginData);

  }

}
