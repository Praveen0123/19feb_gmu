import { Component, OnInit } from '@angular/core';
import { UserProfileFacadeService } from '@app/root-store/user-profile-store/user-profile-facade.service';
import { UserLoginModel } from '@app/root-store/user-profile-store/user-profile.state';


@Component({
  selector: 'gmu-login-model',
  templateUrl: './login-model.component.html',
  styleUrls: ['./login-model.component.scss']
})
export class LoginModelComponent implements OnInit
{

  constructor(
    private userProfileFacadeService: UserProfileFacadeService
  ) { }

  ngOnInit(): void
  {
  }

  onLoginFormSubmit(userLoginData: UserLoginModel)
  {
    this.userProfileFacadeService.requestToSaveUserLoginForm(userLoginData);
  }


}
