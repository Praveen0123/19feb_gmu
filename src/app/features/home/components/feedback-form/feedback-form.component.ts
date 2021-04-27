import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from '@app/core/services/navigation/navigation.service';
import { NotificationService } from '@app/core/services/notification/notification.service';
import { FeedbackInput } from '@gql';

@Component({
  selector: 'gmu-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit
{
  @Output() feedbackEventEmitter: EventEmitter<FeedbackInput> = new EventEmitter<FeedbackInput>();
  formGroup: FormGroup;
  options: string[];
  constructor(private formBuilder: FormBuilder, private notificationService: NotificationService,
    private navigationService: NavigationService) { }

  ngOnInit(): void
  {
    this.options = ['Site Feedback', 'Report a Bug'];
    this.buildForm();
  }
  private buildForm()
  {
    const category = new FormControl('', [Validators.required]);
    const body = new FormControl('', [Validators.required]);
    this.formGroup = this.formBuilder.group(
      {
        category,
        body
      });
  }
  onFormSubmit()
  {
    this.feedbackEventEmitter.emit(this.formGroup.value);
    this.notificationService.success('Thank you for your feedback!');
    this.navigationService.goBack();
  }
}
