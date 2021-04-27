import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Milestone, MilestoneInput, SaveStudentCourseGQL, SaveStudentGQL, SaveStudentMilestoneGQL, Student, StudentByStudentIdOrEmailGQL, StudentByStudentIdOrEmailQuery, StudentCourseInput, StudentInput } from '@gql';
import { ApolloQueryResult } from 'apollo-client';


@Injectable({
  providedIn: 'root'
})
export class StudentService
{


  constructor(
    private studentByStudentIdOrEmailGQL: StudentByStudentIdOrEmailGQL,
    private saveStudentMutation: SaveStudentGQL,
    private saveStudentCourseMutation: SaveStudentCourseGQL,
    private saveStudentMilestoneMutation: SaveStudentMilestoneGQL) { }

  getStudentByStudentIdOrEmail(studentIdOrEmail: string): Observable<Student>
  {
    return this.studentByStudentIdOrEmailGQL.fetch({ studentIdOrEmail }).pipe(
      map((apolloQueryResults: ApolloQueryResult<StudentByStudentIdOrEmailQuery>) =>
      {
        if (apolloQueryResults.data)
        {
          const student: Student = apolloQueryResults.data.studentByStudentIdOrEmail as Student;
          return student;
        }
      })
    );
  }

  saveStudent(studentInput: StudentInput): Observable<Student>
  {
    return this.saveStudentMutation.mutate({ studentInput }).pipe(
      map(apolloQueryResults =>
      {
        if (apolloQueryResults.data)
        {
          const student: Student = apolloQueryResults.data.saveStudent as Student;
          return student;
        }
      })
    );
  }

  saveStudentMilestone(milestoneInput: MilestoneInput): Observable<Milestone>
  {
    //console.log(milestoneInput);
    return this.saveStudentMilestoneMutation.mutate({ milestoneInput }).pipe(
      map(apolloQueryResults =>
      {
        if (apolloQueryResults.data)
        {
          const milestone: Milestone = apolloQueryResults.data.saveStudentMilestone as Milestone;
          return milestone;
        }
      })
    );
  }
  saveStudentCourse(studentCourseInput: StudentCourseInput): Observable<Student>
  {
    return this.saveStudentCourseMutation.mutate({ studentCourseInput }).pipe(
      map(apolloQueryResults =>
      {
        if (apolloQueryResults.data)
        {
          const student: Student = apolloQueryResults.data.saveStudentCourse as Student;
          return student;
        }
      })
    );
  }

}







