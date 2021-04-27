import { Component, Input } from '@angular/core';

/**
 * This component will contain its content to an aspect ratio.
 * Default 1:1
 */
@Component({
  selector: 'gmu-aspect-ratio',
  templateUrl: './aspect-ratio.component.html',
  styleUrls: ['./aspect-ratio.component.scss']
})
export class AspectRatioComponent
{
  // tslint:disable-next-line: variable-name
  paddingBottom = '100%';

  /**
   * The ratio the component uses to contain its content.
   * Format width:height (ex. 16:9)
   */
  @Input()
  set ratio(value: string)
  {
    this.paddingBottom = value.split(':').reduce((first, second) => (+second / +first * 100) + '%');
  }
}
