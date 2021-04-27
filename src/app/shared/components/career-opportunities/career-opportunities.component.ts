import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { OccupationService } from '@app/root-store/occupation-store/occupation.service';
import { Occupation } from '@gql';


@Component({
  selector: 'gmu-career-opportunities',
  templateUrl: './career-opportunities.component.html',
  styleUrls: ['./career-opportunities.component.scss']
})
export class CareerOpportunitiesComponent implements OnInit, OnChanges
{
  @Input() occupationCardList: Occupation[];
  @Output('onOccupationClick') occupationClickEventEmitter = new EventEmitter<Occupation>();

  sortAccordingToSalary: Occupation[] = [];
  sortAccordingToDemand: Occupation[] = [];

  constructor(

  ) { }

  ngOnInit(): void
  {
    this.applySorting();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if (changes.occupationCardList && !changes.occupationCardList.firstChange)
    {
      this.applySorting();
    }
  }

  onOccupationClick(occupation: Occupation)
  {
    if (this.occupationClickEventEmitter.observers.length > 0)
    {
      this.occupationClickEventEmitter.emit(occupation);
    }
  }

  private applySorting()
  {
    this.sortAccordingToSalary = OccupationService.quickSortOccupationBySalary(this.occupationCardList);
    this.sortAccordingToDemand = OccupationService.quickSortByDemandLevel(this.occupationCardList);
  }
}
