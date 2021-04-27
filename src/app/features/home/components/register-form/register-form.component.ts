import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationModel } from '@app/root-store/user-profile-store/user-profile.state';
import { CustomValidators } from 'ngx-custom-validators';
import { RegisterModelComponent } from '../../containers/register-model/register-model.component';

@Component({
  selector: 'gmu-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit
{
  @Output('onFormSubmit') registerClickEventEmitter = new EventEmitter<UserRegistrationModel>();
  @Output('openSignInForm') signInClickEventEmmiter = new EventEmitter<boolean>();

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RegisterModelComponent>
  ) { }

  ngOnInit(): void
  {
    this.buildForm();
  }

  // CREATE THE FORM GROUP
  private buildForm()
  {
    const firstName = new FormControl('', [Validators.required]);
    const lastName = new FormControl('', [Validators.required]);
    const emailAddress = new FormControl('', [Validators.required, Validators.email]);
    const verifyEmailAddress = new FormControl('', [Validators.required, Validators.email, CustomValidators.equalTo(emailAddress)]);

    const password = new FormControl('', [Validators.required]);
    const verifyPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);

    this.formGroup = this.formBuilder.group(
      {
        firstName,
        lastName,
        emailAddress,
        verifyEmailAddress,
        password,
        verifyPassword,
      });
  }

  // ON LOGIN IN FORM SUBMIT
  onFormSubmit()
  {
    if (this.formGroup.valid)
    {
      const userRegistrationData: UserRegistrationModel = this.formGroup.value;

      if (this.registerClickEventEmitter.observers.length > 0)
      {
        this.registerClickEventEmitter.emit(userRegistrationData);
      }


      // CLOSE DIALOG
      this.dialogRef.close();


    }
  }

  onSignInUser()
  {
    // CLOSE DIALOG
    this.dialogRef.close();

    // OPEN SIGN IN POP-UP
    if (this.signInClickEventEmmiter.observers.length > 0)
    {
      this.signInClickEventEmmiter.emit(true);
    }

  }


}
