import { Injectable } from '@angular/core';
import { ApolloQueryResult } from 'apollo-client';
import { Coach, CoachListGQL, CoachListQuery } from '@gql';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RecentSearchModel } from './coach.state';


@Injectable({
  providedIn: 'root'
})
export class CoachService
{
  studentObservable = of(this.fakeStudentData());

  constructor(private coachListGQL: CoachListGQL) { }

  getCoachRecentSearchList(): Observable<RecentSearchModel[]>
  {
    return this.studentObservable.pipe
      (
        map((recentsearch: RecentSearchModel[]) =>
        {
          const list: RecentSearchModel[] = recentsearch as RecentSearchModel[];
          return list;
        })
      );

  }

  getCoachRecentSearchByStudentId(studentId: string): Observable<RecentSearchModel[]>
  {
    return this.studentObservable.pipe(
      map((results: RecentSearchModel[]) =>
      {
        return results as RecentSearchModel[];
      }
      )
    );

  }

  private fakeStudentData()
  {
    const date: Date = new Date();
    const ELEMENT_DATA: RecentSearchModel[] =
      [
        { name: 'Mary Miller / Health Services and Nursing, B.S. Nursing, A.A.S. Nursing', date, email: '' },
        { name: 'Mary Miller / Health Services and Nursing, B.S. Nursing, A.A.S. Nursing', date, email: '' },
        { name: 'Mary Miller / Health Services and Nursing, B.S. Nursing, A.A.S. Nursing', date, email: '' },

      ];
    return (ELEMENT_DATA);
  }



  getCoachList(): Observable<Coach[]>
  {
    return this.coachListGQL.fetch()
      .pipe
      (
        map((apolloQueryResults: ApolloQueryResult<CoachListQuery>) =>
        {
          if (apolloQueryResults.data)
          {
            const coachList: Coach[] = apolloQueryResults.data.coachList;

            return coachList;
          }
        })
      );
  }
}
