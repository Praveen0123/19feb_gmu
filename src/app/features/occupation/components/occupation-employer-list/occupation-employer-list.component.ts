import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Occupation, Employer } from '@gql';
import { OccupationService } from '@app/root-store/occupation-store/occupation.service';

@Component({
  selector: 'gmu-occupation-employer-list',
  templateUrl: './occupation-employer-list.component.html',
  styleUrls: ['./occupation-employer-list.component.scss']
})
export class OccupationEmployerListComponent implements OnInit, OnChanges
{
  @Input() occupationProfileDetails: Occupation;

  employerList: Employer[];
  topEmployer: Employer;

  constructor() { }

  ngOnInit(): void
  {
    this.employerList = this.buildEmployerList();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if (changes.occupationProfileDetails && !changes.occupationProfileDetails.firstChange)
    {
      this.employerList = this.buildEmployerList();
    }
  }


  private buildEmployerList(): Employer[]
  {
    let sortedList: Employer[] = [];

    if (this.occupationProfileDetails && this.occupationProfileDetails.employers && this.occupationProfileDetails.employers.length > 0)
    {
      sortedList = OccupationService.quickSortEmployers(this.occupationProfileDetails.employers);
    }

    this.topEmployer = sortedList.shift();

    return sortedList;
  }

}
