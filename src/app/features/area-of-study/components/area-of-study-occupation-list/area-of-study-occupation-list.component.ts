import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Occupation, AreaOfStudy } from '@gql';

@Component({
  selector: 'gmu-area-of-study-occupation-list',
  templateUrl: './area-of-study-occupation-list.component.html',
  styleUrls: ['./area-of-study-occupation-list.component.scss']
})
export class AreaOfStudyOccupationListComponent implements OnInit
{
  @Input() areaOfStudy: AreaOfStudy;
  @Output('onOccupationClick') occupationClickEventEmitter = new EventEmitter<Occupation>();

  sortTypes: string[] = ['Salary', 'Demand'];
  sortByAreaOfStudy = new FormControl('Salary');

  constructor() { }

  ngOnInit(): void
  {
  }

  onOccupationClick(occupation: Occupation)
  {
    if (this.occupationClickEventEmitter.observers.length > 0)
    {
      this.occupationClickEventEmitter.emit(occupation);
    }
  }

}
