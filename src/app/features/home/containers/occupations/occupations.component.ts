import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { NavigationService } from '@app/core/services/navigation/navigation.service';
import { AreaOfStudy, Occupation, Pathway } from '@gql';
import { AreaOfStudyFacadeService } from '@app/root-store/area-of-study-store/area-of-study-facade.service';
import { OccupationFacadeService } from '@app/root-store/occupation-store/occupation-facade.service';
import { GoogleAnalyticsService, IGoogleAnalyticEvent } from '@app/core/services/google-analytics/google-analytics.service';
import { SearchResultModel } from '@vantage-point/autocomplete-library/lib/models/search/search-result.model';


@Component({
  selector: 'gmu-occupations',
  templateUrl: './occupations.component.html',
  styleUrls: ['./occupations.component.scss'],
})
export class OccupationsComponent implements OnInit
{
  areaOfStudyList$: Observable<AreaOfStudy[]>;

  constructor
    (
      private areaOfStudyFacadeService: AreaOfStudyFacadeService,
      private occupationFacadeService: OccupationFacadeService,
      private navigationService: NavigationService,
      private gas: GoogleAnalyticsService
    ) { }

  ngOnInit(): void
  {
    this.areaOfStudyList$ = this.areaOfStudyFacadeService.getAreaOfStudyList();
  }

  onOccupationSelected(selectedItem: SearchResultModel)
  {

    // GOOGLE ANALYTICS
    const googleAnalyticEvent: IGoogleAnalyticEvent = {
      eventName: 'event',
      eventCategory: 'Event-Occupation-Search',
      eventAction: 'Occupation Search Result',
      eventLabel: ` Occupation Search Term: ${selectedItem.name}`,
      eventValue: null
    };

    this.gas.emitEvent(googleAnalyticEvent);

    this.navigationService.goToOccupationPreview(selectedItem.id);
  }

  onAreaOfStudyClick(areaOfStudy: AreaOfStudy)
  {
    this.areaOfStudyFacadeService.setSelectedAreaOfStudy(areaOfStudy);
    this.navigationService.goToAreaOfStudyOccupationList(areaOfStudy);
  }

  onOccupationClick(occupation: Occupation)
  {
    // GOOGLE ANALYTICS
    const googleAnalyticEvent: IGoogleAnalyticEvent =
    {
      eventName: 'event',
      eventCategory: 'Event-career-occupation',
      eventAction: 'occupation card click from occupation list',
      eventLabel: ` onetCode: ${occupation.onetCode} | occupation-name: ${occupation.title}`,
      eventValue: null
    };

    this.gas.emitEvent(googleAnalyticEvent);


    // SET DEFAULT PATHWAY IF ONE EXISTS WITH OCCUPATION
    if (occupation.pathways && occupation.pathways.length > 0)
    {
      this.occupationFacadeService.setSelectedPathwayFromOccupationList(occupation.pathways[0]);
    }

    // NAVIGATE TO THE OCCUPATION DETAIL PAGE
    this.navigationService.goToOccupationDetailPage(occupation.vpOccupationId);
  }
}
