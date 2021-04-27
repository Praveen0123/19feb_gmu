import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Occupation } from '@gql';

@Component({
  selector: 'gmu-career-occupations',
  templateUrl: './career-occupations.component.html',
  styleUrls: ['./career-occupations.component.scss'],

})
export class CareerOccupationsComponent implements OnInit
{
  @Input() title: string;
  @Input() subTitle: string;
  @Input() occupationList: Occupation[];
  @Output('onOccupationClick') occupationClickEventEmitter = new EventEmitter<Occupation>();

  constructor
    (
    ) { }

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
