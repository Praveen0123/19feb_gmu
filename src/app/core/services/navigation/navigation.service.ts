import { Injectable, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { AreaOfStudy } from '@gql';
import { filter, map, takeWhile } from 'rxjs/operators';
import { UserProfileFacadeService } from '@app/root-store/user-profile-store/user-profile-facade.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService implements OnDestroy
{
  defaultNavigationExtras: NavigationExtras;
  private navigationId: number;
  private alive = true;

  ROUTES =
    {
      Admin: '/admin',
      AreaOfStudy: '/area-of-study',
      ConnectWithCoach: '/connect-with-coach',
      Home: '/home',
      Example: '/example',
      Occupations: '/occupations',
      Welcome: '/welcome',
      Coach: '/coach',
      Student: '/student-view',
      ProductSplashPage: '/product-splash-page',
    };

  constructor
    (
      private router: Router,
      private location: Location,
  )
  {

    // https://www.bennadel.com/blog/3533-using-router-events-to-detect-back-and-forward-browser-navigation-in-angular-7-0-4.htm
    router.events
      .pipe
      (
        // The "events" stream contains all the navigation events. For this demo,
        // though, we only care about the NavigationStart event as it contains
        // information about what initiated the navigation sequence.
        filter((event: NavigationEvent) => (event instanceof NavigationStart)),
        takeWhile(() => this.alive),
        map((event: NavigationStart) =>
        {
          this.navigationId = event.id;

          // Every navigation sequence is given a unique ID. Even "popstate"
          // navigations are really just "roll forward" navigations that get
          // a new, unique ID.
          // The "navigationTrigger" will be one of:
          // --
          // - imperative (ie, user clicked a link).
          // - popstate (ie, browser controlled change such as Back button).
          // - hashchange
          // --
          // NOTE: I am not sure what triggers the "hashchange" type.

          // console.group('NavigationStart Event');
          // console.log('navigation id:', event.id);
          // console.log('route:', event.url);
          // console.log('trigger:', event.navigationTrigger);

          // This "restoredState" property is defined when the navigation
          // event is triggered by a "popstate" event (ex, back / forward
          // buttons). It will contain the ID of the earlier navigation event
          // to which the browser is returning.
          // --
          // CAUTION: This ID may not be part of the current page rendering.
          // This value is pulled out of the browser; and, may exist across
          // page refreshes.
          if (event.restoredState)
          {
            // console.warn('restoring navigation id:', event.restoredState.navigationId);

            this.navigationId = event.restoredState.navigationId;
          }

          // console.groupEnd();
        })
      )
      .subscribe();
  }

  ngOnDestroy()
  {
    this.alive = false;
  }



  // COACH VIEW
  goToCoachView()
  {
    const url = `${this.ROUTES.Coach}`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }

  goToCoachViewSearchStudent(id: string)
  {
    const url = `${this.ROUTES.Coach}/${id}`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }
  // GOTO-PRODUCT-SPLASH-PAGE
  goToProductSplashPage()
  {
    const url = `${this.ROUTES.ProductSplashPage}`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }


  // ADMIN-HOME-PAGE
  goToAdminHomePage()
  {
    const url = `${this.ROUTES.Admin}`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }

  goToLoginPage()
  {
    const url = `${this.ROUTES.Home}/login`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }
  goToManageStudentPage()
  {
    const url = `${this.ROUTES.Admin}/manage-student`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }

  goToManageStudentDetailsPage(id: string)
  {
    const url = `${this.ROUTES.Admin}/manage-student/${id}`;
    this.router.navigate([url], this.defaultNavigationExtras);

  }
  goToStudentNotFoundPage()
  {
    const url = `${this.ROUTES.Admin}/manage-student/student-not-found`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }

  goToCoachViewWithErrors()
  {
    const url = `${this.ROUTES.Coach}`;
    this.router.navigate([url], { ...(this.defaultNavigationExtras || {}), queryParams: { error: true } });
  }

  // CONNECT WITH COACH FORM
  goToConnectWithCoachForm()
  {
    const url = `${this.ROUTES.ConnectWithCoach}`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }

  // BACK
  goBack()
  {
    // console.log('navigationId', this.navigationId);
    if (this.navigationId > 1)
    {
      this.location.back();
    }
    else
    {
      this.goToHomePage();
    }
  }


  // HOME
  goToHomePage()
  {
    const url = `${this.ROUTES.Home}`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }
  goToWelcomePage()
  {
    const url = `${this.ROUTES.Welcome}`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }
  goToDegreeExplorerPage()
  {
    const url = `${this.ROUTES.Home}/pathway`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }
  goToPathwayDetails(id: string)
  {
    const url = `${this.ROUTES.Home}/pathway/${id}`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }
  goToOccupationPreview(id: string)
  {
    const url = `${this.ROUTES.Home}/occupations/${id}`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }
  goToFeedbackPage()
  {
    const url = `${this.ROUTES.Home}/feedback`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }

  // OCCUPATIONS
  goToOccupationListPage()
  {
    const url = `${this.ROUTES.Occupations}`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }
  goToOccupationDetailPage(occupationId: string)
  {
    const url = `${this.ROUTES.Occupations}/${occupationId}`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }


  // AREA OF STUDY
  goToAreaOfStudyOccupationList(areaOfStudy: AreaOfStudy)
  {
    const url = `${this.ROUTES.AreaOfStudy}/occupation-list/${areaOfStudy.id}`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }

  // Student View

  goToStudentViewPage()
  {
    const url = `${this.ROUTES.Student}`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }
}
