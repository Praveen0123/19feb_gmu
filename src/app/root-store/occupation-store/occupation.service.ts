import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { OccupationDetailsByIdGQL, OccupationDetailsByIdQuery, Occupation, OccupationPreviewByIdGQL, OccupationPreviewByIdQuery, Hotspot, Employer } from '@gql';
import { ApolloQueryResult } from 'apollo-client';


@Injectable({
  providedIn: 'root'
})
export class OccupationService
{
  constructor
    (
      private occupationDetailsByIdGQL: OccupationDetailsByIdGQL,
      private occupationPreviewByIdGQL: OccupationPreviewByIdGQL
    ) { }

  static quickSortByDemandLevel(array: Occupation[]): Occupation[]
  {
    if (!array || array.length < 2) { return array; }

    const arrayCopy: Occupation[] = JSON.parse(JSON.stringify(array));
    const pivot = arrayCopy[Math.floor(Math.random() * arrayCopy.length)];
    const left: Occupation[] = [];
    const equal: Occupation[] = [];
    const right: Occupation[] = [];

    while (arrayCopy.length)
    {
      if (arrayCopy[0].projectedGrowthRateId < pivot.projectedGrowthRateId)
      {
        left.push(arrayCopy.shift() as Occupation);
      }
      else if (arrayCopy[0].projectedGrowthRateId === pivot.projectedGrowthRateId)
      {
        equal.push(arrayCopy.shift() as Occupation);
      }
      else
      {
        right.push(arrayCopy.shift() as Occupation);
      }
    }

    return [...this.quickSortByDemandLevel(left), ...equal, ...this.quickSortByDemandLevel(right)];
  }

  static quickSortOccupationBySalary(array: Occupation[]): Occupation[]
  {
    if (!array || array.length < 2) { return array; }

    const arrayCopy: Occupation[] = JSON.parse(JSON.stringify(array));
    const pivot = arrayCopy[Math.floor(Math.random() * arrayCopy.length)];
    const left: Occupation[] = [];
    const equal: Occupation[] = [];
    const right: Occupation[] = [];

    while (arrayCopy.length)
    {
      if (arrayCopy[0].preferredSalary.medianSalaryPerYear > pivot.preferredSalary.medianSalaryPerYear)
      {
        left.push(arrayCopy.shift() as Occupation);
      }
      else if (arrayCopy[0].preferredSalary.medianSalaryPerYear === pivot.preferredSalary.medianSalaryPerYear)
      {
        equal.push(arrayCopy.shift() as Occupation);
      }
      else
      {
        right.push(arrayCopy.shift() as Occupation);
      }
    }

    return [...this.quickSortOccupationBySalary(left), ...equal, ...this.quickSortOccupationBySalary(right)];
  }

  static quickSortHotspotBySalary(array: Hotspot[]): Hotspot[]
  {
    if (!array || array.length < 2) { return array; }

    const arrayCopy: Hotspot[] = JSON.parse(JSON.stringify(array));
    const pivot = arrayCopy[Math.floor(Math.random() * arrayCopy.length)];
    const left: Hotspot[] = [];
    const equal: Hotspot[] = [];
    const right: Hotspot[] = [];

    while (arrayCopy.length)
    {
      if (arrayCopy[0].preferredSalary.minimumSalaryPerYear > pivot.preferredSalary.minimumSalaryPerYear)
      {
        left.push(arrayCopy.shift() as Hotspot);
      }
      else if (arrayCopy[0].preferredSalary.minimumSalaryPerYear === pivot.preferredSalary.minimumSalaryPerYear)
      {
        equal.push(arrayCopy.shift() as Hotspot);
      }
      else
      {
        right.push(arrayCopy.shift() as Hotspot);
      }
    }

    return [...this.quickSortHotspotBySalary(left), ...equal, ...this.quickSortHotspotBySalary(right)];
  }

  static quickSortEmployers(array: Employer[]): Employer[]
  {
    if (!array || array.length < 2) { return array; }

    const arrayCopy: Employer[] = JSON.parse(JSON.stringify(array));
    const pivot = arrayCopy[Math.floor(Math.random() * arrayCopy.length)];
    const left: Employer[] = [];
    const equal: Employer[] = [];
    const right: Employer[] = [];

    while (arrayCopy.length)
    {
      if (arrayCopy[0].count > pivot.count)
      {
        left.push(arrayCopy.shift() as Employer);
      }
      else if (arrayCopy[0].count === pivot.count)
      {
        equal.push(arrayCopy.shift() as Employer);
      }
      else
      {
        right.push(arrayCopy.shift() as Employer);
      }
    }

    return [...this.quickSortEmployers(left), ...equal, ...this.quickSortEmployers(right)];
  }

  getOccupationDetails(occupationId: string): Observable<Occupation>
  {
    return this.occupationDetailsByIdGQL.fetch({ id: occupationId })
      .pipe
      (
        map((apolloQueryResults: ApolloQueryResult<OccupationDetailsByIdQuery>) =>
        {
          if (apolloQueryResults.data)
          {
            const occupation: Occupation = apolloQueryResults.data.occupationById as Occupation;

            return occupation;
          }
        })
      );
  }

  getOccupationPreview(occupationId: string): Observable<Occupation>
  {
    return this.occupationPreviewByIdGQL.fetch({ id: occupationId })
      .pipe
      (
        map((apolloQueryResults: ApolloQueryResult<OccupationPreviewByIdQuery>) =>
        {
          if (apolloQueryResults.data)
          {
            const occupationPreview: Occupation = apolloQueryResults.data.occupationById as Occupation;

            return occupationPreview;
          }
        })
      );
  }
}
