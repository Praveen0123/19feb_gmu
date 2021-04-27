import { Injectable } from '@angular/core';
import { AreaOfStudy, AreaOfStudyListGQL, AreaOfStudyListSilentlyGQL, AreaOfStudyListQuery, AreaOfStudyByIdGQL, AreaOfStudyByIdQuery } from '@gql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApolloQueryResult } from 'apollo-client';

@Injectable({
  providedIn: 'root'
})
export class AreaOfStudyService
{

  constructor
    (
      private areaOfStudyListGQL: AreaOfStudyListGQL,
      private areaOfStudyListSilently: AreaOfStudyListSilentlyGQL,
      private areaOfStudyByIdGQL: AreaOfStudyByIdGQL
    ) { }


  getAreaOfStudyList(): Observable<AreaOfStudy[]>
  {
    return this.areaOfStudyListGQL.fetch()
      .pipe
      (
        map((apolloQueryResults: ApolloQueryResult<AreaOfStudyListQuery>) =>
        {
          if (apolloQueryResults.data)
          {
            return this.toAreaOfStuudyList(apolloQueryResults);
          }
        })
      );
  }

  getAreaOfStudyListSilently(): Observable<AreaOfStudy[]>
  {
    return this.areaOfStudyListSilently.fetch()
      .pipe
      (
        map((apolloQueryResults: ApolloQueryResult<AreaOfStudyListQuery>) =>
        {
          if (apolloQueryResults.data)
          {
            return this.toAreaOfStuudyList(apolloQueryResults);
          }
        })
      );
  }

  getAreaOfStudyById(areaOfStudyId: string): Observable<AreaOfStudy>
  {
    return this.areaOfStudyByIdGQL.fetch({ areaOfStudyId })
      .pipe
      (
        map((result: ApolloQueryResult<AreaOfStudyByIdQuery>) => result.data.areaOfStudyById as AreaOfStudy)
      );
  }


  private toAreaOfStuudyList(apolloQueryResults: ApolloQueryResult<AreaOfStudyListQuery>)
  {
    const list: AreaOfStudy[] = [];

    apolloQueryResults.data.areaOfStudyList.map(item =>
    {
      const areaOfStudy: AreaOfStudy = item as AreaOfStudy;
      list.push(areaOfStudy);
    });

    return list;
  }
}
