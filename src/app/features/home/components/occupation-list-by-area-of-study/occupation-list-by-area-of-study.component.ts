import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AreaOfStudy, Occupation } from '@gql';
import { NavigationService } from '@app/core/services/navigation/navigation.service';


@Component({
  selector: 'gmu-occupation-list-by-area-of-study',
  templateUrl: './occupation-list-by-area-of-study.component.html',
  styleUrls: ['./occupation-list-by-area-of-study.component.scss']
})
export class OccupationListByAreaOfStudyComponent implements OnInit
{
  @Input() areaOfStudyList: AreaOfStudy[];
  @Output('onAreaOfStudyClick') areaOfStudyClickEventEmitter = new EventEmitter<AreaOfStudy>();
  @Output('onOccupationClick') occupationClickEventEmitter = new EventEmitter<Occupation>();

  constructor
    (

    ) { }

  ngOnInit(): void
  {
  }

  onAreaOfStudyClick(areaOfStudy: AreaOfStudy)
  {
    if (this.areaOfStudyClickEventEmitter.observers.length > 0)
    {
      this.areaOfStudyClickEventEmitter.emit(areaOfStudy);
    }
  }

  onOccupationClick(occupation: Occupation)
  {
    if (this.occupationClickEventEmitter.observers.length > 0)
    {
      this.occupationClickEventEmitter.emit(occupation);
    }
  }
}
