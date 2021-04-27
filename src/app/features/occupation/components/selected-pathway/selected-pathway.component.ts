import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Occupation, Pathway } from '@gql';
import * as _ from 'lodash';


@Component({
  selector: 'gmu-selected-pathway',
  templateUrl: './selected-pathway.component.html',
  styleUrls: ['./selected-pathway.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedPathwayComponent implements OnInit
{
  @Input() occupationProfileDetails: Occupation;
  @Input() selectedPathway: Pathway;

  toggleText: string;
  sortedPathwayList: Pathway[];

  constructor() { }

  ngOnInit(): void
  {
    if (!this.selectedPathway && this.occupationProfileDetails && this.occupationProfileDetails.pathways && this.occupationProfileDetails.pathways.length > 0)
    {
      this.selectedPathway = this.occupationProfileDetails.pathways[0];
    }

    this.sortedPathwayList = _.orderBy(this.occupationProfileDetails.pathways, (o: Pathway) => o.name);
  }
}
