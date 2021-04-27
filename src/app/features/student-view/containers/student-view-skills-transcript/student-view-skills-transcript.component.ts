import { Component, OnInit } from '@angular/core';
import { StudetProfileFacadeService } from '@app/root-store/student-profile-store/student-profile-facade.service';
import { studentSkillsTranscriptModel } from '@app/root-store/student-profile-store/student-profile.state';
import { StudentFacadeService } from '@app/root-store/student-store/student-facade.service';
import { Student } from '@gql';
import { Observable } from 'rxjs';

@Component({
  selector: 'gmu-student-view-skills-transcript',
  templateUrl: './student-view-skills-transcript.component.html',
  styleUrls: ['./student-view-skills-transcript.component.scss']
})
export class StudentViewSkillsTranscriptComponent implements OnInit
{

  student$: Observable<Student>;

  constructor(
    private studentFacadeService: StudentFacadeService
  ) { }

  ngOnInit(): void
  {
    this.student$ = this.studentFacadeService.getStudent();
  }

}
