import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import * as _ from 'lodash';

import { Occupation, Skill, Pathway, Student, PlannerCourse } from '@gql';
import { CONFIG } from '@env/config';
import { DegreeDetailsSkillDefinitionComponent } from '@app/features/home/components/degree-details-skill-definition/degree-details-skill-definition.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoadmapMode } from '@app/root-store/pathway-store/pathway.state';


@Component({
  selector: 'gmu-roadmap-medium',
  templateUrl: './roadmap-medium.component.html',
  styleUrls: ['./roadmap-medium.component.scss']
})
export class RoadmapMediumComponent implements OnInit, OnChanges
{
  @Input() occupationProfileDetails: Occupation;
  @Input() mode: string = 'Skills View';
  @Input() student: Student;

  selectedPathway: Pathway;
  sortedPathwayList: Pathway[];
  formGroup: FormGroup;
  arePathwaysVisible: boolean = false;
  skillListYear1: Skill[];
  skillListYear2: Skill[];
  skillListYear3: Skill[];
  skillListYear4: Skill[];
  courseListYear1: PlannerCourse[];
  courseListYear2: PlannerCourse[];
  courseListYear3: PlannerCourse[];
  courseListYear4: PlannerCourse[];

  acquiredSkills: Set<string>;

  constructor
    (
      private formBuilder: FormBuilder,
      private bottomSheet: MatBottomSheet
    ) { }


  ngOnInit(): void
  {
    this.sortPatways();
    this.initForm();
    this.buildSkillLists();
  }

  ngOnChanges(changes: SimpleChanges): void
  {
    if (
      (changes.selectedPathway && !changes.selectedPathway.firstChange) ||
      (changes.student && !changes.student.firstChange) ||
      (changes.mode && !changes.mode.firstChange))
    {
      this.sortPatways();
      this.initForm();
      this.buildSkillLists();
    }
  }

  openBottomSheet(skillModel: Skill): void
  {
    this.bottomSheet.open(DegreeDetailsSkillDefinitionComponent,
      {
        data: skillModel,
        panelClass: 'skill-definition-bottom-sheet'
      });
  }

  onSelectionPathway(pathway: Pathway)
  {
    this.selectedPathway = pathway;
    this.buildSkillLists();
  }


  private sortPatways()
  {
    if (this.occupationProfileDetails && this.occupationProfileDetails.pathways && this.occupationProfileDetails.pathways.length > 0)
    {
      this.arePathwaysVisible = this.occupationProfileDetails.pathways.length > 1;
      this.sortedPathwayList = _.orderBy(this.occupationProfileDetails.pathways, (o: Pathway) => o.name);
      this.selectedPathway = this.sortedPathwayList[0];
    }
  }

  private initForm()
  {
    this.formGroup = this.formBuilder.group(
      {
        pathway: new FormControl(this.selectedPathway, [Validators.required])
      });
  }

  private buildSkillLists(): void
  {
    //console.log('Building lists: ' + this.mode);
    //console.log(this.student);
    if (this.selectedPathway?.skillsByYear)
    {
      //console.log('Building 1');
      this.skillListYear1 = this.selectedPathway.skillsByYear.find(x => x.year === 1)?.skillList;
      this.skillListYear2 = this.selectedPathway.skillsByYear.find(x => x.year === 2)?.skillList;
      this.skillListYear3 = this.selectedPathway.skillsByYear.find(x => x.year === 3)?.skillList;
      this.skillListYear4 = this.selectedPathway.skillsByYear.find(x => x.year === 4)?.skillList;
    } else if (this.student?.skillsByYear && this.mode === 'Skills View')
    {
      //console.log('Building 2');
      this.skillListYear1 = this.student.skillsByYear.find(x => x?.year === 1)?.skillList;
      this.skillListYear2 = this.student.skillsByYear.find(x => x?.year === 2)?.skillList;
      this.skillListYear3 = this.student.skillsByYear.find(x => x?.year === 3)?.skillList;
      this.skillListYear4 = this.student.skillsByYear.find(x => x?.year === 4)?.skillList;
      this.setCompletedSkills();
    } else if (this.student?.skillsByYear)
    {
      //console.log('Building 3');
      this.courseListYear1 = this.student.courses.filter(x => x.schoolYear === 1 && (x.planned || x.completed));
      this.courseListYear2 = this.student.courses.filter(x => x.schoolYear === 2 && (x.planned || x.completed));
      this.courseListYear3 = this.student.courses.filter(x => x.schoolYear === 3 && (x.planned || x.completed));
      this.courseListYear4 = this.student.courses.filter(x => x.schoolYear === 4 && (x.planned || x.completed));
    }
  }

  private setCompletedSkills()
  {
    const completedCourses = this.student.courses.filter(x => x.completed);
    this.acquiredSkills = new Set();
    completedCourses?.forEach(x => x.skillList?.forEach(s => this.acquiredSkills.add(s.label)));
  }

  private calcYear() { }
}
