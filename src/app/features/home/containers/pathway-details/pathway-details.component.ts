import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Pathway, Occupation } from '@gql';
import { NavigationService } from '@app/core/services/navigation/navigation.service';
import { PathwayFacadeService } from '@app/root-store/pathway-store/pathway-facade.service';
import { GoogleAnalyticsService, IGoogleAnalyticEvent } from '@app/core/services/google-analytics/google-analytics.service';
import { CONFIG } from '@env/config';
import { OccupationFacadeService } from '@app/root-store/occupation-store/occupation-facade.service';


@Component({
  selector: 'gmu-pathway-details',
  templateUrl: './pathway-details.component.html',
  styleUrls: ['./pathway-details.component.scss']
})
export class PathwayDetailsComponent implements OnInit
{
  pathwayList$: Observable<Pathway[]>;
  pathway$: Observable<Pathway>;
  occupationCardList$: Observable<Occupation[]>;
  description: string;
  highlightedText: string;


  constructor
    (
      private navigationService: NavigationService,
      private pathwayFacadeService: PathwayFacadeService,
      private occupationFacadeService: OccupationFacadeService,
      private gas: GoogleAnalyticsService
    ) { }

  ngOnInit(): void
  {
    this.pathwayList$ = this.pathwayFacadeService.getPathwayList();
    this.pathway$ = this.pathwayFacadeService.getPathway();
    this.description = CONFIG.MESSAGING.COACH.DESCRIPTION;
    this.highlightedText = CONFIG.MESSAGING.COACH.HIGHLIGHTTEXT;
  }

  onPathwayExplorerFormSubmit(selectedPathway: Pathway)
  {
    this.navigationService.goToPathwayDetails(selectedPathway.id);
  }

  onOccupationClick(selectedPathway: Pathway, occupation: Occupation)
  {
    // GOOGLE ANALYTICS
    const googleAnalyticEvent: IGoogleAnalyticEvent =
    {
      eventName: 'event',
      eventCategory: 'Event-career-occupation',
      eventAction: 'occupation card click from pathway details',
      eventLabel: ` onetCode: ${occupation.onetCode} | occupation-name: ${occupation.title}`,
      eventValue: null
    };

    this.gas.emitEvent(googleAnalyticEvent);

    this.occupationFacadeService.setSelectedPathwayFromPathwayDetails(selectedPathway);
    this.navigationService.goToOccupationDetailPage(occupation.vpOccupationId);
  }

  onClearPathwaySelection()
  {
    this.pathwayFacadeService.requestClearSelectedPathway();
    this.navigationService.goToHomePage();
  }

}
