import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { UserLoginModel } from '@app/root-store/user-profile-store/user-profile.state';
import { LoginModelComponent } from '../../containers/login-model/login-model.component';
import { RegisterModelComponent } from '../../containers/register-model/register-model.component';



@Component({
  selector: 'gmu-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit
{

  formGroup: FormGroup;
  @Output('onFormSubmit') loginClickEventEmitter = new EventEmitter<UserLoginModel>();


  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private loginDialogRef: MatDialogRef<LoginModelComponent>

  ) { }

  ngOnInit(): void
  {
    this.buildForm();
  }

  // CREATE THE FORM GROUP
  private buildForm()
  {
    this.formGroup = this.formBuilder.group(
      {
        userName: new FormControl(null, [Validators.required]),
        userPassword: new FormControl(null, [Validators.required]),
      });
  }

  // ON LOGIN FORM SUBMIT
  onFormSubmit()
  {
    if (this.formGroup.valid)
    {
      // SEND THE FORM DETAILS TO SMART COMPONENT TO MAKE SERVICE CALL
      const userLoginData: UserLoginModel = this.formGroup.value;

      if (this.loginClickEventEmitter.observers.length > 0)
      {
        this.loginClickEventEmitter.emit(userLoginData);
      }

      // CLOSE THE DIALOG
      this.loginDialogRef.close();
    }
  }

  onForgotPassword()
  {

  }


  onRegisterNewUser()
  {
    // CLOSE THE DIALOG
    this.loginDialogRef.close();

    // SIGN UP DIALOG CONFIGURATION
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '448px';
    dialogConfig.autoFocus = false;

    const registerDialogRef = this.dialog.open(RegisterModelComponent, dialogConfig);


  }





}

