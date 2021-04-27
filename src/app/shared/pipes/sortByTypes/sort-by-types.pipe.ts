import { Pipe, PipeTransform } from '@angular/core';

import { OccupationService } from '@app/root-store/occupation-store/occupation.service';
import { Occupation } from '@gql';

@Pipe({
  name: 'sortByTypes'
})
export class SortByTypesPipe implements PipeTransform
{

  transform(occupationList: Occupation[], types: string): Occupation[]
  {
    let sortAccordingTypes: Occupation[] = [];

    // SORT THE DATA BASED ON TYPES

    sortAccordingTypes = (types === 'Salary') ? OccupationService.quickSortOccupationBySalary(occupationList) :
      (types === 'Demand') ? OccupationService.quickSortByDemandLevel(occupationList) : occupationList;

    return sortAccordingTypes;

  }


}
