import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Occupation, AreaOfStudy, Pathway, Student } from '@gql';


@Component({
  selector: 'gmu-student-view-skill-roadmap-shared',
  templateUrl: './student-view-skill-roadmap-shared.component.html',
  styleUrls: ['./student-view-skill-roadmap-shared.component.scss']
})
export class StudentViewSkillRoadmapSharedComponent implements OnInit
{

  @Input() pathway: Pathway;
  @Input() student: Student;
  selectedSkillType: string;
  @Output('onAreaOfStudyClick') areaOfStudyClickEventEmitter = new EventEmitter<AreaOfStudy>();
  @Output('onOccupationClick') occupationClickEventEmitter = new EventEmitter<Occupation>();



  constructor
    (

    ) { }


  ngOnInit(): void
  {
    this.selectedSkillType = 'Skills View';

  }


  onOccupationClick(occupation: Occupation)
  {
    if (this.occupationClickEventEmitter.observers.length > 0)
    {
      this.occupationClickEventEmitter.emit(occupation);
    }
  }
  onAreaOfStudyClick(areaOfStudy: AreaOfStudy)
  {
    if (this.areaOfStudyClickEventEmitter.observers.length > 0)
    {
      this.areaOfStudyClickEventEmitter.emit(areaOfStudy);
    }
  }


  changeSkillType(value)
  {
    this.selectedSkillType = value;
  }


}
