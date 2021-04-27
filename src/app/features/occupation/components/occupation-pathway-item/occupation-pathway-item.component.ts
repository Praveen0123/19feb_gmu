import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { Pathway } from '@gql';

@Component({
  selector: 'gmu-occupation-pathway-item',
  templateUrl: './occupation-pathway-item.component.html',
  styleUrls: ['./occupation-pathway-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OccupationPathwayItemComponent implements OnInit
{
  @Input() pathway: Pathway;
  @Output('onPathwayClick') pathwayClickEventEmitter = new EventEmitter<Pathway>();

  constructor() { }

  ngOnInit(): void
  {
  }

  onPathwayClick()
  {
    if (this.pathwayClickEventEmitter.observers.length > 0)
    {
      this.pathwayClickEventEmitter.emit(this.pathway);
    }
  }
}
