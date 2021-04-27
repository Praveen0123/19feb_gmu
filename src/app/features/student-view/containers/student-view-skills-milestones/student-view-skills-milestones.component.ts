import { Component, OnInit } from '@angular/core';
import { SkillsRoadmapModel } from '@app/root-store/student-skills-roadmap-store/skills-roadmap-state';
import { Observable } from 'rxjs';
import { StudentFacadeService } from '@app/root-store/student-store/student-facade.service';
import { MilestoneInput, Student } from '@gql';

@Component({
  selector: 'gmu-student-view-skills-milestones',
  templateUrl: './student-view-skills-milestones.component.html',
  styleUrls: ['./student-view-skills-milestones.component.scss']
})
export class StudentViewSkillsMilestonesComponent implements OnInit
{

  student$: Observable<Student>;
  constructor(private studentFacadeService: StudentFacadeService) { }

  ngOnInit(): void
  {
    this.student$ = this.studentFacadeService.getStudent();
  }

  onUpdateMilestone(milestoneInput: MilestoneInput)
  {
    this.studentFacadeService.requestToSaveStudentMilestone(milestoneInput);
  }
  search(x) { }
}
