import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentFacadeService } from '@app/root-store/student-store/student-facade.service';
import { Student, StudentCourseInput } from '@gql';

@Component({
  selector: 'gmu-student-view-skills-profile',
  templateUrl: './student-view-skills-profile.component.html',
  styleUrls: ['./student-view-skills-profile.component.scss']
})
export class StudentViewSkillsProfileComponent implements OnInit
{
  student$: Observable<Student>;
  selectedSkillType: string;

  constructor(
    private studentFacadeService: StudentFacadeService
  ) { }

  changeSkillType(value)
  {
    this.selectedSkillType = value;
  }

  ngOnInit(): void
  {
    this.student$ = this.studentFacadeService.getStudent();
    this.selectedSkillType = 'NOVA';
  }

  onUpdateStudentCourses(studentCourseInput: StudentCourseInput)
  {
    //console.log('updating');
    this.studentFacadeService.requestToSaveStudentCourse(studentCourseInput);
  }
}
