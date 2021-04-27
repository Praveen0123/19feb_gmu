import { Component, OnInit, Input } from '@angular/core';
import { Skill } from '@gql';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { DegreeDetailsSkillDefinitionComponent } from '../degree-details-skill-definition/degree-details-skill-definition.component';
import { CourseModel } from '@app/root-store/pathway-store/pathway.state';


@Component({
  selector: 'gmu-course-outline',
  templateUrl: './course-outline.component.html',
  styleUrls: ['./course-outline.component.scss']
})
export class CourseOutlineComponent implements OnInit
{
  @Input() title: string;
  @Input() courseList: CourseModel[];
  @Input() degreeName: string;

  totalCourseCredits: number = 0;

  constructor
    (
      private bottomSheet: MatBottomSheet
    ) { }

  ngOnInit(): void
  {
    if (this.courseList)
    {
      this.totalCourseCredits = this.courseList.reduce((accumulaor, item: CourseModel) => accumulaor + item.credits, 0);
    }
  }

  onClickSkill(selectedSkill: Skill)
  {
    this.bottomSheet.open(DegreeDetailsSkillDefinitionComponent,
      {
        data: selectedSkill,
        panelClass: 'skill-definition-bottom-sheet'
      });
  }
}
