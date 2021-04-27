import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PathwaySummaryModel, SkillTypeEnum, CourseModel } from './pathway.state';
import { Pathway, PathwayListGQL, PathwayDetailsByIdGQL, PathwayDetailsByIdQuery, PathwayListQuery, Course, Degree, Skill, FullPathwayListGQL, FullPathwayListQuery } from '@gql';
import { ApolloQueryResult } from 'apollo-client';


@Injectable({
  providedIn: 'root'
})
export class PathwayService
{

  constructor
    (
      private pathwayListGQL: PathwayListGQL,
      private pathwayDetailsByIdGQL: PathwayDetailsByIdGQL,
      private fullPathwayListGQL: FullPathwayListGQL
    ) { }

  static getPathwaySummaryModel(pathway: Pathway): PathwaySummaryModel
  {
    if (pathway)
    {
      const courseList = this.getCourseList(pathway);
      const novaCourses = courseList.filter((course) => course.school === 'NOVA');
      const masonCourses = courseList.filter((course) => course.school === 'GMU');
      const pathwaySummaryModel: PathwaySummaryModel =
      {
        novaCourses,
        novaClassCount: this.getClassCountFromList(novaCourses),
        novaCredits: this.getCreditCountFromList(novaCourses),
        masonCourses,
        masonClassCount: this.getClassCountFromList(masonCourses),
        masonCredits: this.getCreditCountFromList(masonCourses)
      };

      return pathwaySummaryModel;
    }
  }

  static getCourseList(pathway: Pathway): CourseModel[]
  {
    const courses: CourseModel[] = [];
    if (pathway)
    {
      pathway.courseGroupings?.forEach(grouping =>
      {
        const groupingCourses: CourseModel[] = grouping.selectedSampleCourseList?.map(course => ({ ...course, year: grouping.year, sequenceNumber: grouping.sequenceNumber })) ?? [];
        courses.push(...groupingCourses);
      });
    }
    return courses.sort((a, b) => a.sequenceNumber - b.sequenceNumber);
  }

  static getClassCountFromList(courseList: CourseModel[])
  {
    return courseList?.length ?? 0;
  }
  static getCreditCountFromList(courseList: CourseModel[])
  {
    return courseList?.reduce((ac, c: CourseModel) => ac + c.credits, 0) ?? 0;
  }

  static getClassCount(degree: Degree): number
  {
    return (degree.courses) ? degree.courses.length : 0;
  }
  static getCreditCount(degree: Degree): number
  {
    return (degree.courses) ? degree.courses.reduce((accumulaor, item: Course) => accumulaor + item.credits, 0) : 0;
  }
  static findSkillsBySkillType(skillsList: Skill[], skillType: SkillTypeEnum): Skill[]
  {
    const results: Skill[] = [];
    // FIND ALL DEGREES MATCHING PASSED SKILL TYPE
    skillsList.map((item: Skill) =>
    {
      if (item.type === skillType)
      {
        results.push(item);
      }
    });

    return results;
  }
  static quickSortByDemandLevel(array: Skill[]): Skill[]
  {
    if (!array || array.length < 2) { return array; }

    const arrayCopy: Skill[] = JSON.parse(JSON.stringify(array));
    const pivot = arrayCopy[Math.floor(Math.random() * arrayCopy.length)];
    const left: Skill[] = [];
    const equal: Skill[] = [];
    const right: Skill[] = [];

    while (arrayCopy.length)
    {
      if (arrayCopy[0].demandLevel > pivot.demandLevel)
      {
        left.push(arrayCopy.shift() as Skill);
      }
      else if (arrayCopy[0].demandLevel === pivot.demandLevel)
      {
        equal.push(arrayCopy.shift() as Skill);
      }
      else
      {
        right.push(arrayCopy.shift() as Skill);
      }
    }

    return [...this.quickSortByDemandLevel(left), ...equal, ...this.quickSortByDemandLevel(right)];
  }



  getPathwayList(): Observable<Pathway[]>
  {
    return this.pathwayListGQL.fetch()
      .pipe
      (
        map((apolloQueryResults: ApolloQueryResult<PathwayListQuery>) =>
        {
          if (apolloQueryResults.data)
          {
            const pathwayList: Pathway[] = apolloQueryResults.data.pathwayList;

            return pathwayList;
          }
        })
      );
  }
  getFullPathwayList(): Observable<Pathway[]>
  {
    return this.fullPathwayListGQL.fetch()
      .pipe
      (
        map((apolloQueryResults: ApolloQueryResult<FullPathwayListQuery>) =>
        {
          if (apolloQueryResults.data)
          {
            const pathwayList: Pathway[] = apolloQueryResults.data.allPathwayList;

            return pathwayList;
          }
        })
      );
  }

  getPathwayDetails(pathwayId: string): Observable<Pathway>
  {
    return this.pathwayDetailsByIdGQL.fetch({ id: pathwayId })
      .pipe
      (
        map((apolloQueryResults: ApolloQueryResult<PathwayDetailsByIdQuery>) =>
        {
          if (apolloQueryResults.data)
          {
            const pathway: Pathway = apolloQueryResults.data.pathwayById as Pathway;

            return pathway;
          }
        })
      );
  }
}
