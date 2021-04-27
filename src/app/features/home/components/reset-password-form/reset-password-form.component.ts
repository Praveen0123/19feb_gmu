import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { ResetPasswordRequest, RequestType } from '@app/root-store/user-profile-store/user-profile.state';

@Component({
  selector: 'gmu-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss']
})
export class ResetPasswordFormComponent implements OnInit, OnChanges
{

  @Input() reset: boolean;

  @Output() resetPasswordEventEmitter: EventEmitter<ResetPasswordRequest> = new EventEmitter<ResetPasswordRequest>();
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void
  {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if (changes.reset && !changes.reset.firstChange)
    {
      this.buildForm();
    }
  }

  // CREATE THE FORM GROUP
  private buildForm()
  {
    let emailValue = '';
    if (this.formGroup?.controls?.emailAddress?.value)
    {
      emailValue = this.formGroup.controls.emailAddress.value;
    }
    const emailAddress = new FormControl(emailValue, [Validators.required]);
    const code = new FormControl('', [Validators.required]);
    const password = new FormControl('', [Validators.required]);
    const verifyPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);

    this.formGroup = this.formBuilder.group(
      {
        emailAddress,
        code: (this.reset) ? code : '',
        password: (this.reset) ? password : '',
        verifyPassword: (this.reset) ? verifyPassword : '',
      });
  }

  onFormSubmit()
  {
    if (this.formGroup.valid)
    {
      const resetPasswordRequest: ResetPasswordRequest = this.formGroup.value;
      resetPasswordRequest.requestType = this.reset ? RequestType.RESET_PASSWORD : RequestType.REQUEST_CODE;
      //console.log(resetPasswordRequest);
      if (this.resetPasswordEventEmitter.observers.length > 0)
      {
        this.resetPasswordEventEmitter.emit(resetPasswordRequest);
      }
    }
  }

  resendCode()
  {
    if (this.formGroup.controls.emailAddress)
    {
      const resetPasswordRequest: ResetPasswordRequest = this.formGroup.value;
      resetPasswordRequest.requestType = RequestType.REQUEST_CODE;
      if (this.resetPasswordEventEmitter.observers.length > 0)
      {
        this.resetPasswordEventEmitter.emit(resetPasswordRequest);
      }
    }
    else
    {
      this.formGroup.controls.emailAddress.setErrors({ required: true });
    }
  }

}
