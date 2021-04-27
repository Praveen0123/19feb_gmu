import { Component, OnInit, OnChanges, SimpleChange, SimpleChanges, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { Occupation, Pathway } from '@gql';
import { OccupationFacadeService } from '@app/root-store/occupation-store/occupation-facade.service';
import { DeviceCharacteristics } from '@app/root-store/device-store/device.state';
import { DeviceFacadeService } from '@app/root-store/device-store/device-facade.service';
import { CONFIG } from '@env/config';


@Component({
  selector: 'gmu-occupation-profile',
  templateUrl: './occupation-profile.component.html',
  styleUrls: ['./occupation-profile.component.scss']
})
export class OccupationProfileComponent implements OnInit, OnChanges, OnDestroy
{

  occupationProfileModel$: Observable<Occupation>;
  selectedPathway$: Observable<Pathway>;
  deviceCharacteristics$: Observable<DeviceCharacteristics>;
  description: string;
  highLightText: string;

  constructor
    (
      private occupationFacadeService: OccupationFacadeService,
      private deviceFacadeService: DeviceFacadeService
    ) { }

  ngOnInit(): void
  {
    this.occupationProfileModel$ = this.occupationFacadeService.getOccupationDetails();
    this.selectedPathway$ = this.occupationFacadeService.getSelectedPathway();
    this.deviceCharacteristics$ = this.deviceFacadeService.getDeviceCharacteristics$();
    this.description = '';//CONFIG.MESSAGING.COACH.DESCRIPTION;
    this.highLightText = '';//CONFIG.MESSAGING.COACH.HIGHLIGHTTEXT;
  }

  ngOnChanges(changes: SimpleChanges): void
  {
    this.occupationProfileModel$ = this.occupationFacadeService.getOccupationDetails();
  }

  ngOnDestroy()
  {
    this.occupationFacadeService.requestClearSelectedOccupationModel();
  }

  onPathwayClick(pathway: Pathway)
  {
    this.occupationFacadeService.setSelectedPathwayFromOccupationPathwayList(pathway);
  }
}
