import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { PlannerGrouping, Student, StudentCourseInput } from '@gql';

@Component({
  selector: 'gmu-skills-profile',
  templateUrl: './skills-profile.component.html',
  styleUrls: ['./skills-profile.component.scss']
})
export class SkillsProfileComponent implements OnInit, OnChanges
{

  @Output() courseUpdateEventEmitter = new EventEmitter<StudentCourseInput>();
  @Input() student: Student;
  @Input() skillType;

  novaGroupings: PlannerGrouping[];
  masonGroupings: PlannerGrouping[];

  constructor() { }

  ngOnInit(): void
  {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if (changes.student && !changes.student.firstChange)
    {
      this.init();
    }
  }

  init()
  {
    this.novaGroupings = this.student?.courseGroupings?.filter(x => x.year < 3) ?? [];
    //console.log(this.student?.courseGroupings.filter(x => x.year < 3));
    this.novaGroupings.sort((a, b) => a.sequenceNumber - b.sequenceNumber);
    this.masonGroupings = this.student?.courseGroupings?.filter(x => x.year >= 3) ?? [];
    this.masonGroupings.sort((a, b) => a.sequenceNumber - b.sequenceNumber);
  }

  emit(event: StudentCourseInput)
  {
    this.courseUpdateEventEmitter.emit(event);
  }

}
