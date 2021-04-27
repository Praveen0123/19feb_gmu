import { Component, OnInit } from '@angular/core';
import { filter, takeWhile, map } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

import { NavLinkModel } from '@core/models';


@Component({
  selector: 'gmu-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit
{
  private alive = true;
  navLinks: NavLinkModel[];


  constructor
    (
      private router: Router
    ) { }

  ngOnInit(): void
  {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeWhile(() => this.alive),
        map((event: NavigationEnd) =>
        {
          this.buildNavLinks();
        })
      ).subscribe();

    this.buildNavLinks();
  }


  ngOnDestroy(): void
  {
    this.alive = false;
  }

  private buildNavLinks(): void
  {
    const addStudentRoute = `/admin/add-student`;
    const manageStudentRoute = '/admin/manage-student';

    const navLinks: NavLinkModel[] = [
      {
        label: 'Add Student',
        path: addStudentRoute,
        icon: 'icon-plus-adminview',
        message: '',
        isActive: (addStudentRoute.includes(this.router.url))
      },
      {
        label: 'Manage Student',
        path: manageStudentRoute,
        icon: 'icon-grad-adminview',
        message: '',
        isActive: (manageStudentRoute.includes(this.router.url))
      },
    ];

    this.navLinks = navLinks;
  }


}
