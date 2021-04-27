import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { NavigationService } from '@app/core/services/navigation/navigation.service';
import { PathwayFacadeService } from '@app/root-store/pathway-store/pathway-facade.service';
import { Pathway } from '@gql';
import { DeviceCharacteristics } from '@app/root-store/device-store/device.state';
import { DeviceFacadeService } from '@app/root-store/device-store/device-facade.service';
import { CONFIG } from '@env/config';


@Component({
  selector: 'gmu-pathway-explorer',
  templateUrl: './pathway-explorer.component.html',
  styleUrls: ['./pathway-explorer.component.scss']
})
export class PathwayExplorerComponent implements OnInit
{
  pathwayList$: Observable<Pathway[]>;
  pathway$: Observable<Pathway>;
  deviceCharacteristics$: Observable<DeviceCharacteristics>;
  description: string;
  highLightText: string;

  constructor
    (
      private navigationService: NavigationService,
      private pathwayFacadeService: PathwayFacadeService,
      private deviceFacadeService: DeviceFacadeService,
  ) { }

  ngOnInit(): void
  {
    this.pathwayList$ = this.pathwayFacadeService.getPathwayList();
    this.pathway$ = this.pathwayFacadeService.getPathway();
    this.description = CONFIG.MESSAGING.COACH.DESCRIPTION;
    this.highLightText = CONFIG.MESSAGING.COACH.HIGHLIGHTTEXT;
    this.deviceCharacteristics$ = this.deviceFacadeService.getDeviceCharacteristics$();
  }

  onPathwayExplorerFormSubmit(selectedPathway: Pathway)
  {
    this.navigationService.goToPathwayDetails(selectedPathway.id);
  }

  onClearPathwaySelection()
  {
    this.pathwayFacadeService.requestClearSelectedPathway();
  }
}
