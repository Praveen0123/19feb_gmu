import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserLoginModel } from '@app/root-store/user-profile-store/user-profile.state';
import { LoginModelComponent } from '../../containers/login-model/login-model.component';
import { RegisterModelComponent } from '../../containers/register-model/register-model.component';



@Component({
  selector: 'gmu-login-page-form',
  templateUrl: './login-page-form.component.html',
  styleUrls: ['./login-page-form.component.scss']
})
export class LoginPageFormComponent implements OnInit
{

  formGroup: FormGroup;
  @Output('onFormSubmit') loginClickEventEmitter = new EventEmitter<UserLoginModel>();


  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
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

    }
  }

  onForgotPassword()
  {
    this.router.navigate(['/home/forgot-password']);
  }


  onRegisterNewUser()
  {
    this.router.navigate(['/home/register']);
  }





}

