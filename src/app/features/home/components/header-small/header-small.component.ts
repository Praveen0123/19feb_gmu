import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavigationService } from '@app/core/services/navigation/navigation.service';
import { UserDetails } from '@app/root-store/user-profile-store/user-profile.state';


@Component({
  selector: 'gmu-header-small',
  templateUrl: './header-small.component.html',
  styleUrls: ['./header-small.component.scss']
})
export class HeaderSmallComponent implements OnInit
{
  @Input() userDetails: UserDetails;
  @Output() signOutEventEmitter: EventEmitter<void> = new EventEmitter();
  @Output('openSideDrawer') sideDrawerOpenEventEmitter: EventEmitter<void> = new EventEmitter();

  constructor
    (
      private navigationService: NavigationService
    ) { }

  ngOnInit(): void
  {
  }

  onClickAdvance()
  {
    this.navigationService.goToHomePage();
  }

  onClickSignOut()
  {
    this.signOutEventEmitter.emit();
  }

  onClickDehaze()
  {
    this.sideDrawerOpenEventEmitter.emit();
  }

  onClickSignIn()
  {
    this.navigationService.goToLoginPage();
  }
}
