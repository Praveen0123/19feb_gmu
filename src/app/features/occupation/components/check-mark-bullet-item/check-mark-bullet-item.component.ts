import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'gmu-check-mark-bullet-item',
  templateUrl: './check-mark-bullet-item.component.html',
  styleUrls: ['./check-mark-bullet-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckMarkBulletItemComponent implements OnInit
{

  @Input() title: string;
  @Input() subtitle: string;

  constructor() { }

  ngOnInit(): void
  {
  }

}
