import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, takeWhile, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { CONFIG } from '@env/config';
import { Pathway } from '@gql';
import { NavLinkModel } from '@core/models';
import { DeviceCharacteristics } from '@app/root-store/device-store/device.state';
import { DeviceFacadeService } from '@app/root-store/device-store/device-facade.service';
import { PathwayFacadeService } from '@app/root-store/pathway-store/pathway-facade.service';


@Component({
  selector: 'gmu-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy
{
  private alive = true;

  title: string;
  description: string;
  navLinks: NavLinkModel[];
  deviceCharacteristics$: Observable<DeviceCharacteristics>;
  welcomeVideoUrl: string = CONFIG.MESSAGING.HOME.WELCOME_VIDEO_URL;
  selectedPathway: Pathway;

  constructor
    (
      private router: Router,
      private deviceFacadeService: DeviceFacadeService,
      private pathwayFacadeService: PathwayFacadeService
    ) { }

  ngOnInit(): void
  {
    this.title = CONFIG.MESSAGING.HOME.TILE;
    this.description = CONFIG.MESSAGING.HOME.DESCRIPTION;
    this.deviceCharacteristics$ = this.deviceFacadeService.getDeviceCharacteristics$();

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeWhile(() => this.alive),
        map((event: NavigationEnd) =>
        {
          this.buildNavLinks();
        })
      ).subscribe();

    this.pathwayFacadeService.getPathway()
      .pipe
      (
        takeWhile(() => this.alive),
        map((item: Pathway) =>
        {
          this.selectedPathway = item;
          this.buildNavLinks();
        })
      ).subscribe();
  }

  ngOnDestroy(): void
  {
    this.alive = false;
  }


  private buildNavLinks(): void
  {
    const pathwayRoute = (this.selectedPathway) ? `/home/pathway/${this.selectedPathway.id}` : `/home/pathway`;
    const occupationRoute = '/home/occupations';

    const navLinks: NavLinkModel[] = [
      {
        label: 'Pathway Explorer',
        path: pathwayRoute,
        icon: 'icon-degree-explorer',
        message: '',
        isActive: (pathwayRoute.includes(this.router.url))
      },
      {
        label: 'Careers',
        path: occupationRoute,
        icon: 'icon-occupations',
        message: '',
        isActive: (occupationRoute.includes(this.router.url))
      },
    ];

    this.navLinks = navLinks;
  }
}
