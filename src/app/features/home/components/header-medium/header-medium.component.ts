import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CONFIG } from '@env/config';
import { NavigationService } from '@app/core/services/navigation/navigation.service';
import { LoginModelComponent } from '../../containers/login-model/login-model.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserDetails } from '@app/root-store/user-profile-store/user-profile.state';
import { Router } from '@angular/router';

@Component({
  selector: 'gmu-header-medium',
  templateUrl: './header-medium.component.html',
  styleUrls: ['./header-medium.component.scss']
})
export class HeaderMediumComponent implements OnInit, OnChanges
{
  @Input() userDetails: UserDetails;
  @Output() signOutEventEmitter: EventEmitter<void> = new EventEmitter();
  novaIcon: string;
  gmuIcon: string;
  homeLink: string;


  constructor
    (
      private navigationService: NavigationService,
      private dialog: MatDialog,
      private router: Router
    ) { }

  ngOnInit(): void
  {
    this.novaIcon = CONFIG.IMAGES.NOVA_ICON;
    this.gmuIcon = CONFIG.IMAGES.GMU_ICON;
    this.buildHomeLink();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if (changes.userDetails && !changes.userDetails.firstChange)
    {
      this.buildHomeLink();
    }
  }
  buildHomeLink()
  {
    if (this.userDetails?.isAdmin)
    {
      this.homeLink = '/admin';
    } else if (this.userDetails?.isCoach)
    {
      this.homeLink = '/coach';
    } else
    {
      this.homeLink = '/student-view';
    }
  }

  isHome()
  {

    const isHome = this.router.url.startsWith('/student-view') || this.router.url.startsWith('/coach') || this.router.url.startsWith('/admin');
    return isHome;
  }

  goToStudentViewPage()
  {
    this.navigationService.goToStudentViewPage();
  }
  // GO TO THE ADMIN PAGE
  gotoAdminPage()
  {
    this.navigationService.goToAdminHomePage();
  }

  onClickGoHome()
  {
    this.navigationService.goToHomePage();
  }
  onClickGoToFeedbackPage()
  {
    this.navigationService.goToFeedbackPage();
  }

  // GO TO PRODUCT SPLASH PAGE
  gotoProductSplashPage()
  {
    this.navigationService.goToProductSplashPage();
  }
  onClickSignOut()
  {
    this.signOutEventEmitter.emit();
  }
  onClickSignIn()
  {
    this.navigationService.goToLoginPage();
  }

}
