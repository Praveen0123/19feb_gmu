import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { ConfirmRegistrationRequest } from '@app/root-store/user-profile-store/user-profile.state';
import { CONFIG } from '@env/config';

@Component({
  selector: 'gmu-confirm-sign-up-form',
  templateUrl: './confirm-sign-up-form.component.html',
  styleUrls: ['./confirm-sign-up-form.component.scss']
})
export class ConfirmSignUpFormComponent implements OnInit
{
  @Input() email: string;
  @Output() confirmRegistrationEventEmitter: EventEmitter<ConfirmRegistrationRequest> = new EventEmitter<ConfirmRegistrationRequest>();
  formGroup: FormGroup;
  confirmSignUpInstructions = CONFIG.MESSAGING.AUTH.CONFIRM_REGISTRATION;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void
  {
    this.buildForm();
  }

  // CREATE THE FORM GROUP
  private buildForm()
  {
    const code = new FormControl('', [Validators.required]);
    this.formGroup = this.formBuilder.group(
      {
        code,
        email: this.email
      });
  }

  onFormSubmit()
  {
    if (this.formGroup.valid)
    {
      const confirmRegistrationRequest: ConfirmRegistrationRequest = this.formGroup.value;
      if (this.confirmRegistrationEventEmitter.observers.length > 0)
      {
        this.confirmRegistrationEventEmitter.emit(confirmRegistrationRequest);
      }
    }
  }
}
