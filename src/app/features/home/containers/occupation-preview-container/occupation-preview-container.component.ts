import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AreaOfStudy, Occupation } from '@gql';
import { AreaOfStudyFacadeService } from '@app/root-store/area-of-study-store/area-of-study-facade.service';
import { OccupationFacadeService } from '@app/root-store/occupation-store/occupation-facade.service';
import { NavigationService } from '@app/core/services/navigation/navigation.service';
import { GoogleAnalyticsService, IGoogleAnalyticEvent } from '@app/core/services/google-analytics/google-analytics.service';
import { SearchResultModel } from '@vantage-point/autocomplete-library/lib/models/search/search-result.model';


@Component({
  selector: 'gmu-occupation-container-preview',
  templateUrl: './occupation-preview-container.component.html',
  styleUrls: ['./occupation-preview-container.component.scss']
})
export class OccupationPreviewContainerComponent implements OnInit
{
  areaOfStudyList$: Observable<AreaOfStudy[]>;
  occupationPreview$: Observable<Occupation>;
  apiUrl: string;

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
    this.occupationPreview$ = this.occupationFacadeService.getOccupationPreview();
    this.apiUrl = "https://api-autocomplete.datastop.io/autocomplete/2/onet_occupation";
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
      eventCategory: 'Event-career-occupation-preview',
      eventAction: 'occupation card click from occupation preview',
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

  onOccupationPreviewClick(occupationPreview: Occupation)
  {
    // GOOGLE ANALYTICS
    const googleAnalyticEvent: IGoogleAnalyticEvent =
    {
      eventName: 'event',
      eventCategory: 'Event-career-occupation-preview',
      eventAction: 'occupation preview clicked',
      eventLabel: ` onetCode: ${occupationPreview.onetCode} | occupation-name: ${occupationPreview.title}`,
      eventValue: null
    };

    this.gas.emitEvent(googleAnalyticEvent);

    // NAVIGATE TO THE OCCUPATION DETAIL PAGE
    this.navigationService.goToOccupationDetailPage(occupationPreview.vpOccupationId);
  }
}
