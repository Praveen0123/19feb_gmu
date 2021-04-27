import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IRootState, StudentStore } from '../root-store';
import { Observable } from 'rxjs';
import { MilestoneInput, Student, StudentCourseInput, StudentInput } from '@gql';

@Injectable({
  providedIn: 'root'
})
export class StudentFacadeService
{

  constructor(private store: Store<IRootState>) { }



  requestToSaveStudentForm(studentInput: StudentInput)
  {
    return this.store.dispatch(StudentStore.Actions.requestToSaveStudentForm({ studentInput }));
  }


  requestStudentDetails(studentIdOrEmail: string)
  {
    return this.store.dispatch(StudentStore.Actions.requestStudentDetailsByStudentIdOrEmail({ studentIdOrEmail }));
  }

  requestClearSelectedStudents()
  {
    return this.store.dispatch(StudentStore.Actions.requestClearSelectedStudent());
  }

  clearErrorState()
  {
    return this.store.dispatch(StudentStore.Actions.clearErrorState());
  }
  getErrors()
  {
    return this.store.pipe(select(StudentStore.Selectors.getError));
  }

  getStudent(): Observable<Student>
  {
    return this.store.pipe(select(StudentStore.Selectors.getStudent));
  }

  requestToSaveStudentCourse(studentCourseInput: StudentCourseInput)
  {
    return this.store.dispatch(StudentStore.Actions.requestToSaveStudentCourse({ studentCourseInput }));
  }

  requestToSaveStudentMilestone(milestoneInput: MilestoneInput)
  {
    return this.store.dispatch(StudentStore.Actions.requestToSaveStudentMilestone({ milestoneInput }));
  }
}
