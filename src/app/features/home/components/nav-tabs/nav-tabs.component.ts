import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { NavLinkModel } from '@core/models';


@Component({
  selector: 'gmu-nav-tabs',
  templateUrl: './nav-tabs.component.html',
  styleUrls: ['./nav-tabs.component.scss'],
})
export class NavTabsComponent implements OnInit
{
  @Input() navLinks: NavLinkModel[];

  constructor
    (
      public router: Router
    ) { }

  ngOnInit(): void
  {
  }

  trackByFn(index, item)
  {
    return index; // or item.id
  }
}
