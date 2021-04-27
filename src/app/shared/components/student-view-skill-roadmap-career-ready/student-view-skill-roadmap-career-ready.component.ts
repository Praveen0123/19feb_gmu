import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Occupation, AreaOfStudy, Pathway } from '@gql';
import { SkillsRoadmapModel } from '@app/root-store/student-skills-roadmap-store/skills-roadmap-state';

@Component({
  selector: 'gmu-student-view-skill-roadmap-career-ready',
  templateUrl: './student-view-skill-roadmap-career-ready.component.html',
  styleUrls: ['./student-view-skill-roadmap-career-ready.component.scss']
})
export class StudentViewSkillRoadmapCareerReadyComponent implements OnInit
{

  @Input() skillRoadmap: SkillsRoadmapModel[];
  @Input() pathway: Pathway;

  @Output('onAreaOfStudyClick') areaOfStudyClickEventEmitter = new EventEmitter<AreaOfStudy>();
  @Output('onOccupationClick') occupationClickEventEmitter = new EventEmitter<Occupation>();

  constructor
    (

    ) { }


  ngOnInit(): void
  {

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


}





