import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from '@app/core/services/navigation/navigation.service';
import { RecentSearchModel } from '@app/root-store/coach-store/coach.state';




@Component({
  selector: 'gmu-coach-recent-searches',
  templateUrl: './coach-recent-searches.component.html',
  styleUrls: ['./coach-recent-searches.component.scss']
})



export class CoachRecentSearchesComponent implements OnInit, OnDestroy
{

  displayedColumns: string[] = ['Recent', 'Date'];
  @Input() recentDataSource: RecentSearchModel[];

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void
  {
    console.log(this.recentDataSource);
  }

  // GO TO COACH VIEW MILESTONE TAB
  goToMilestonePage(email)
  {
    localStorage.setItem('searchId', email.trim());
    this.navigationService.goToStudentViewPage();

  }

  ngOnDestroy(): void
  {

  }





}
