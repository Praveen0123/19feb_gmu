import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CONFIG } from '@env/config';
import { Occupation, Hotspot } from '@gql';
import { HotSpotModel } from '@vantage-point/maps';
import { OccupationService } from '@app/root-store/occupation-store/occupation.service';

@Component({
  selector: 'gmu-occupation-hot-spot',
  templateUrl: './occupation-hot-spot.component.html',
  styleUrls: ['./occupation-hot-spot.component.scss']
})
export class OccupationHotSpotComponent implements OnInit, OnChanges
{
  @Input() occupationProfileDetails: Occupation;

  hotSpotDescription: string = CONFIG.MESSAGING.OCCUPATIONS.DESCRIPTIONS.HOT_SPOT;
  hotspotList: HotSpotModel[];
  orderedHotspotList: Hotspot[];

  constructor() { }

  ngOnInit(): void
  {
    this.hotspotList = this.mapOccupationHotSpotList();
    this.orderedHotspotList = this.orderHotspots();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if (changes.occupationProfileDetails && !changes.occupationProfileDetails.firstChange)
    {
      this.hotspotList = this.mapOccupationHotSpotList();
      this.orderedHotspotList = this.orderHotspots();
    }
  }

  private mapOccupationHotSpotList(): HotSpotModel[]
  {
    const list: HotSpotModel[] = [];

    if (this.occupationProfileDetails && this.occupationProfileDetails.hotspotList)
    {
      this.occupationProfileDetails.hotspotList.map((item: Hotspot) =>
      {
        const hotSpotModel: HotSpotModel =
        {
          city: item.cityName,
          stateAbbreviation: item.stateAbbreviation,
          lat: item.latitude,
          lon: item.longitude,
          salary: item.preferredSalary.minimumSalaryPerYear
        };

        list.push(hotSpotModel);
      });
    }

    return list;
  }

  private orderHotspots(): Hotspot[]
  {
    if (this.occupationProfileDetails && this.occupationProfileDetails.hotspotList)
    {
      return OccupationService.quickSortHotspotBySalary(this.occupationProfileDetails.hotspotList);
    }

    return [];
  }

}
