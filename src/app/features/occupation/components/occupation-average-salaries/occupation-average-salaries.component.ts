import { Component, OnInit, Input } from '@angular/core';
import { CONFIG } from '@env/config';
import { GeoSalaryModel } from '@vantage-point/maps';
import { Occupation } from '@gql';

@Component({
  selector: 'gmu-occupation-average-salaries',
  templateUrl: './occupation-average-salaries.component.html',
  styleUrls: ['./occupation-average-salaries.component.scss']
})
export class OccupationAverageSalariesComponent implements OnInit
{
  averageSalariesDescription: string = CONFIG.MESSAGING.OCCUPATIONS.DESCRIPTIONS.AVERAGE_SALARY;
  averageSalariesTitle: string = CONFIG.MESSAGING.OCCUPATIONS.TITLE;
  mapTitle: string;
  nationalSalaryList: GeoSalaryModel[] = [];
  stateSalaryList: GeoSalaryModel[];


  @Input() occupationProfileDetails: Occupation;

  constructor() { }

  ngOnInit(): void
  {
    this.mapTitle = `Average Salaries by State for ${this.occupationProfileDetails.title}`;
    // this.nationalSalaryList = this.occupationProfileDetails.nationalSalaryList;
  }

  onStateSelected(selectedGeoSalaryModel: GeoSalaryModel)
  {

    /*
    NOTE:  NEED TO HIT A SERVICE TO RETRIEVE SALARY LIST FOR A GIVEN STATE BY COUNTY
     */
    this.stateSalaryList =
      [
        {
          code: 'us-tx-027',
          value: 67784.5,
        },
        {
          code: 'us-tx-029',
          value: 73389.9609375
        },
        {
          code: 'us-tx-039',
          value: 46203.0
        },
        {
          code: 'us-tx-085',
          value: 109354.75
        },
        {
          code: 'us-tx-097',
          value: 128063.0
        },
        {
          code: 'us-tx-113',
          value: 92398.03125
        },
        {
          code: 'us-tx-135',
          value: 70492.0
        },
        {
          code: 'us-tx-141',
          value: 80110.0
        },
        {
          code: 'us-tx-201',
          value: 85622.2578125
        },
        {
          code: 'us-tx-219',
          value: 99684.0
        },
        {
          code: 'us-tx-245',
          value: 99294.0
        },
        {
          code: 'us-tx-329',
          value: 62385.671875
        },
        {
          code: 'us-tx-339',
          value: 78301.671875
        },
        {
          code: 'us-tx-355',
          value: 85660.0
        },
        {
          code: 'us-tx-375',
          value: 110528.0
        },
        {
          code: 'us-tx-425',
          value: 77707.25
        },
        {
          code: 'us-tx-439',
          value: 84300.4296875
        },
        {
          code: 'us-tx-453',
          value: 64262.3203125
        },
        {
          code: 'us-tx-491',
          value: 73319.75
        }
      ];
  }

}
