import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { UserRegistrationModel } from '@app/root-store/user-profile-store/user-profile.state';
import { Router } from '@angular/router';

@Component({
  selector: 'gmu-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit
{

  @Output('onFormSubmit') registerClickEventEmitter = new EventEmitter<UserRegistrationModel>();

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder
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
    const emailAddress = new FormControl('', [Validators.required, Validators.email, Validators.pattern('.*@(masonlive.)?gmu.edu')]);
    const verifyEmailAddress = new FormControl('', [Validators.required, Validators.email, CustomValidators.equalTo(emailAddress)]);
    const studentId = new FormControl('', [Validators.required]);
    const password = new FormControl('', [Validators.required]);
    const verifyPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);

    this.formGroup = this.formBuilder.group(
      {
        firstName,
        lastName,
        emailAddress,
        verifyEmailAddress,
        studentId,
        password,
        verifyPassword,
      });
  }

  onFormSubmit()
  {
    if (this.formGroup.valid)
    {
      const userRegistrationData: UserRegistrationModel = this.formGroup.value;

      if (this.registerClickEventEmitter.observers.length > 0)
      {
        this.registerClickEventEmitter.emit(userRegistrationData);
      }
    }
  }
}
