import { Component, OnInit, Input } from '@angular/core';
import { Occupation } from '@gql';

@Component({
  selector: 'gmu-occupation-stats',
  templateUrl: './occupation-stats.component.html',
  styleUrls: ['./occupation-stats.component.scss']
})
export class OccupationStatsComponent implements OnInit
{
  @Input() occupationProfileDetails: Occupation;

  constructor() { }

  ngOnInit(): void
  {
  }

}
