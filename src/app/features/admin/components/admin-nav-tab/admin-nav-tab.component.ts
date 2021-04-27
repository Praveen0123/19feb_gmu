import { Component, OnInit, Input } from '@angular/core';

import { NavLinkModel } from '@core/models';


@Component({
  selector: 'gmu-admin-nav-tab',
  templateUrl: './admin-nav-tab.component.html',
  styleUrls: ['./admin-nav-tab.component.scss']
})
export class AdminNavTabComponent implements OnInit
{

  @Input() navLinks: NavLinkModel[];

  constructor
    (
    ) { }

  ngOnInit(): void
  {
  }

  trackByFn(index, item)
  {
    return index; // or item.id
  }

}
