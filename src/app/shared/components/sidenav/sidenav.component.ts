import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gmu-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit
{
  @Input() themeColor: string = '';

  constructor() { }

  ngOnInit(): void
  {
  }

}
