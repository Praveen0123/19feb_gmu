import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ConnectWithCoachFacadeService } from '@app/root-store/connect-with-coach-store/connect-with-coach-facade.service';
import { ConnectWithCoach, Pathway } from '@gql';
import { PathwayFacadeService } from '@app/root-store/pathway-store/pathway-facade.service';
import { GoogleAnalyticsService, IGoogleAnalyticEvent } from '@app/core/services/google-analytics/google-analytics.service';

@Component({
  selector: 'gmu-connect-with-coach',
  templateUrl: './connect-with-coach.component.html',
  styleUrls: ['./connect-with-coach.component.scss']
})
export class ConnectWithCoachComponent implements OnInit
{

  pathwayList$: Observable<Pathway[]>;

  constructor
    (
      private connectWithCoachFacadeService: ConnectWithCoachFacadeService,
      private pathwayFacadeService: PathwayFacadeService,
      private gas: GoogleAnalyticsService
    ) { }

  ngOnInit(): void
  {
    this.pathwayList$ = this.pathwayFacadeService.getPathwayList();
  }

  onConnectWithCoachFormSubmit(connectWithCoach: ConnectWithCoach)
  {
    this.connectWithCoachFacadeService.requestToSaveConnectWithCoachForm(connectWithCoach);

    // GOOGLE ANALYTICS...
    const googleAnalyticEvent: IGoogleAnalyticEvent =
    {
      eventName: 'event',
      eventCategory: 'Trigger-Connect with Coach Form-1 Submission',
      eventAction: 'Form Submission',
      eventLabel: 'Connect with Coach Form',
      eventValue: null
    };

    this.gas.emitEvent(googleAnalyticEvent);
  }
}
