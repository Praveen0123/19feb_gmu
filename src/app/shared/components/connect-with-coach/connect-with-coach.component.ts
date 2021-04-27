import { Component, Input, OnInit } from '@angular/core';
import { IGoogleAnalyticEvent, GoogleAnalyticsService } from '@app/core/services/google-analytics/google-analytics.service';

@Component({
  selector: 'gmu-connect-with-coach',
  templateUrl: './connect-with-coach.component.html',
  styleUrls: ['./connect-with-coach.component.scss'],
})
export class ConnectWithCoachComponent implements OnInit
{
  @Input() eventLabel: string = null;

  constructor
    (
      private gas: GoogleAnalyticsService
    ) { }

  ngOnInit(): void { }

  openConnectWCoachForm(): void
  {
    // GOOGLE ANALYTICS
    const googleAnalyticEvent: IGoogleAnalyticEvent =
    {
      eventName: 'event',
      eventCategory: 'Connect With Advance',
      eventAction: 'CTA Clicked',
      eventLabel: ` ${this.eventLabel} `,
      eventValue: null
    };

    this.gas.emitEvent(googleAnalyticEvent);
  }
}
