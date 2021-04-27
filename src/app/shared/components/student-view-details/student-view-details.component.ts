import { Component, OnInit, Input } from '@angular/core';
import { SkillsRoadmapModel } from '@app/root-store/student-skills-roadmap-store/skills-roadmap-state';
import { UserProfileModel } from '@app/root-store/user-profile-store/user-profile.state';
import { environment } from '@env/environment';
import { Student } from '@gql';

@Component({
  selector: 'gmu-student-view-details',
  templateUrl: './student-view-details.component.html',
  styleUrls: ['./student-view-details.component.scss']
})
export class StudentViewDetailsComponent implements OnInit
{

  @Input() student: Student;
  constructor() { }

  ngOnInit(): void
  {

  }

  expectedGraduation(): number
  {
    return parseInt((this.student?.cohortYear ?? '2020').substr(0, 4), 10) + 4;
  }

  getCoursePDF()
  {
    const url = `${environment.API.courseCatalogUrl}/${this.student.pathway.code}.pdf`;
    window.open(url);
  }
}
