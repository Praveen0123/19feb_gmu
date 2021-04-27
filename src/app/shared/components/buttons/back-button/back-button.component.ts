import { Component, OnInit } from '@angular/core';
import { NavigationService } from '@app/core/services/navigation/navigation.service';

@Component({
  selector: 'gmu-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit
{

  constructor
    (
      private navigationService: NavigationService
    ) { }

  ngOnInit(): void
  {
  }

  goBack()
  {
    this.navigationService.goBack();
  }
}
