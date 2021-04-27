import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Occupation } from '@gql';


@Component({
  selector: 'gmu-occupation-preview',
  templateUrl: './occupation-preview.component.html',
  styleUrls: ['./occupation-preview.component.scss']
})
export class OccupationPreviewComponent implements OnInit
{
  @Input() occupationPreview: Occupation;
  @Output('onOccupationClick') occupationClickEventEmitter = new EventEmitter<Occupation>();

  constructor() { }

  ngOnInit(): void
  {
  }

  onOccupationClick()
  {
    if (this.occupationClickEventEmitter.observers.length > 0)
    {
      this.occupationClickEventEmitter.emit(this.occupationPreview);
    }
  }

}
