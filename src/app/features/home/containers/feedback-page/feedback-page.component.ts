import { Component, OnInit } from '@angular/core';
import { UserProfileFacadeService } from '@app/root-store/user-profile-store/user-profile-facade.service';
import { FeedbackInput } from '@gql';

@Component({
  selector: 'gmu-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.scss']
})
export class FeedbackPageComponent implements OnInit
{

  constructor(private userProfileFacadeService: UserProfileFacadeService) { }

  ngOnInit(): void
  {
  }

  submitFeedback(feedback: FeedbackInput)
  {
    console.log(feedback);
    this.userProfileFacadeService.saveFeedback(feedback);
  }

}
