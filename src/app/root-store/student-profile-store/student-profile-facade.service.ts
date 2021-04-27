import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IRootState, StudentProfileStore } from '../root-store';
import { StudentProfileSkillsModel, studentSkillsTranscriptModel } from './student-profile.state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudetProfileFacadeService
{

  constructor(private store: Store<IRootState>) { }

  requesetStudentProfileSkillsDetails(id)
  {
    return this.store.dispatch(StudentProfileStore.Actions.requestStudentProfileDetailsFromSkillsProfile({ id }));
  }


  getStudentProfileSkillsList(): Observable<StudentProfileSkillsModel>
  {
    return this.store.pipe(select(StudentProfileStore.Selectors.getStudentProfileSkillsList));
  }


  requestStudentSkillsTranscriptDetails()
  {
    return this.store.dispatch(StudentProfileStore.Actions.requestStudentSkillsTranscriptDetailsFromSkillsTranscript());
  }


  getStudentSkillsTranscriptList(): Observable<studentSkillsTranscriptModel[]>
  {
    this.requestStudentSkillsTranscriptDetails();
    return this.store.pipe(select(StudentProfileStore.Selectors.getStudentSkillsTranscriptList));
  }

}
