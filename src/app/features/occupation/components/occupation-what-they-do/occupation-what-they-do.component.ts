import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Occupation } from '@gql';

@Component({
  selector: 'gmu-occupation-what-they-do',
  templateUrl: './occupation-what-they-do.component.html',
  styleUrls: ['./occupation-what-they-do.component.scss']
})
export class OccupationWhatTheyDoComponent implements OnInit
{
  @Input() occupationProfileDetails: Occupation;
  @Input() isCloseVisible: boolean;

  constructor() { }

  ngOnInit(): void
  {
  }
  afterCloseSheet(event: MouseEvent): void
  {
    // this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
