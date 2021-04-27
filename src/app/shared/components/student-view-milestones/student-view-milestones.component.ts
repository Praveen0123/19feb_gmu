import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Milestone, MilestoneInput } from '@gql';

@Component({
  selector: 'gmu-student-view-milestones',
  templateUrl: './student-view-milestones.component.html',
  styleUrls: ['./student-view-milestones.component.scss']
})
export class StudentViewMilestonesComponent implements OnInit
{
  @Output() milestoneEventEmitter = new EventEmitter<MilestoneInput>();
  @Input() milestones: Milestone[];
  @Input() degree: string;
  @Input() studentId: string;

  constructor() { }

  ngOnInit(): void
  {
  }

  markCompleted(milestone: Milestone)
  {
    const milestoneInput = { id: milestone.id, studentId: this.studentId, milestoneId: milestone.milestoneId, completed: !milestone.completed };
    this.milestoneEventEmitter.emit(milestoneInput);
  }

}
