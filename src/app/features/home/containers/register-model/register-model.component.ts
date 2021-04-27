import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserProfileFacadeService } from '@app/root-store/user-profile-store/user-profile-facade.service';
import { UserRegistrationModel } from '@app/root-store/user-profile-store/user-profile.state';
import { LoginModelComponent } from '../login-model/login-model.component';

@Component({
  selector: 'gmu-register-model',
  templateUrl: './register-model.component.html',
  styleUrls: ['./register-model.component.scss']
})
export class RegisterModelComponent implements OnInit
{

  constructor(
    private dialog: MatDialog,
    private userProfileFacadeService: UserProfileFacadeService
  ) { }

  ngOnInit(): void
  {
  }

  openSignInPopup(event: boolean)
  {
    if (event)
    {
      // SIGN UP DIALOG CONFIGURATION
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '448px';
      dialogConfig.autoFocus = false;

      const dialogRef = this.dialog.open(LoginModelComponent, dialogConfig);
    }
  }

  onRegisterFormSubmit(userRegistration: UserRegistrationModel)
  {
    this.userProfileFacadeService.requestToSaveUserRegistrationForm(userRegistration);
  }

}
