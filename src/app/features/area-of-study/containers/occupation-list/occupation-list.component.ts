import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { NavigationService } from '@app/core/services/navigation/navigation.service';
import { GoogleAnalyticsService, IGoogleAnalyticEvent } from '@app/core/services/google-analytics/google-analytics.service';
import { Occupation, AreaOfStudy } from '@gql';
import { AreaOfStudyFacadeService } from '@app/root-store/area-of-study-store/area-of-study-facade.service';
import { OccupationFacadeService } from '@app/root-store/occupation-store/occupation-facade.service';


@Component({
  selector: 'gmu-occupation-list',
  templateUrl: './occupation-list.component.html',
  styleUrls: ['./occupation-list.component.scss']
})
export class OccupationListComponent implements OnInit, OnDestroy
{
  areaOfStudy$: Observable<AreaOfStudy>;

  constructor
    (
      private areaOfStudyFacadeService: AreaOfStudyFacadeService,
      private occupationFacadeService: OccupationFacadeService,
      private navigationService: NavigationService,
      private gas: GoogleAnalyticsService

    ) { }

  ngOnInit(): void
  {
    this.areaOfStudy$ = this.areaOfStudyFacadeService.getAreaOfStudy();
  }

  ngOnDestroy()
  {
    this.areaOfStudyFacadeService.requestClearSelectedAreaOfStudy();
  }

  onOccupationClick(occupation: Occupation)
  {
    // GOOGLE ANALYTICS
    const googleAnalyticEvent: IGoogleAnalyticEvent =
    {
      eventName: 'event',
      eventCategory: 'Event-career-occupation',
      eventAction: 'occupation card click from area of study',
      eventLabel: ` onetCode: ${occupation.onetCode} | occupation-name: ${occupation.title}`,
      eventValue: null
    };

    this.gas.emitEvent(googleAnalyticEvent);

    // SET DEFAULT PATHWAY IF ONE EXISTS WITH OCCUPATION
    if (occupation.pathways && occupation.pathways.length > 0)
    {
      this.occupationFacadeService.setSelectedPathwayFromAreaOfStudyOccupationList(occupation.pathways[0]);
    }

    // NAVIGATE TO THE OCCUPATION DETAIL PAGE
    this.navigationService.goToOccupationDetailPage(occupation.vpOccupationId);
  }

}
