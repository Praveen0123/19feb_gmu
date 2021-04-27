import { Component, OnInit, Input } from '@angular/core';
import { Occupation } from '@gql';

enum SalaryEnum
{
  Annual = 'Annual',
  Hourly = 'Hourly'
}

@Component({
  selector: 'gmu-occupation-salary',
  templateUrl: './occupation-salary.component.html',
  styleUrls: ['./occupation-salary.component.scss']
})
export class OccupationSalaryComponent implements OnInit
{
  @Input() occupationProfileDetails: Occupation;

  availableSalaryTypes = SalaryEnum;
  selectedSalaryType: SalaryEnum;
  minimumSalary: number;
  medianSalary: number;
  maximumSalary: number;

  barColorColumn1: string;
  barColorColumn2: string;
  barColorColumn3: string;
  barColorColumn4: string;
  barColorColumn5: string;

  constructor() { }

  ngOnInit(): void
  {
    this.selectedSalaryType = SalaryEnum.Annual;
    this.barColorColumn1 = 'hsl(44, 66%, 51%)';
    this.barColorColumn2 = 'transparent linear-gradient(270deg, hsla(151, 100%, 19%, 1) 0%, hsl(44, 66%, 51%) 100%)';
    this.barColorColumn3 = 'hsla(151, 100%, 19%, 1)';
    this.barColorColumn4 = 'transparent linear-gradient(90deg, hsla(151, 100%, 19%, 1) 0%, hsl(152, 93%, 41%) 100%)';
    this.barColorColumn5 = 'hsl(152, 93%, 41%)';

    this.toggleSalary();
  }

  onSalaryTypeSelection(type: SalaryEnum)
  {
    this.selectedSalaryType = type;
    this.toggleSalary();
  }

  private toggleSalary()
  {
    switch (this.selectedSalaryType)
    {
      case SalaryEnum.Annual:
        {
          this.minimumSalary = this.occupationProfileDetails.preferredSalary.minimumSalaryPerYear;
          this.medianSalary = this.occupationProfileDetails.preferredSalary.medianSalaryPerYear;
          this.maximumSalary = this.occupationProfileDetails.preferredSalary.maximumSalaryPerYear;
          break;
        }
      case SalaryEnum.Hourly:
        {
          this.minimumSalary = this.occupationProfileDetails.preferredSalary.minimumSalaryPerHour;
          this.medianSalary = this.occupationProfileDetails.preferredSalary.medianSalaryPerHour;
          this.maximumSalary = this.occupationProfileDetails.preferredSalary.maximumSalaryPerHour;
          break;
        }
    }

    // console.log(`min ${this.minimumSalary}, med ${this.medianSalary}, max ${this.maximumSalary}`);
  }
}
