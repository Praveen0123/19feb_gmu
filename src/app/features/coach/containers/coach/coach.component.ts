import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NavigationService } from '@app/core/services/navigation/navigation.service';
import { CoachFacadeService } from '@app/root-store/coach-store/coach-facade.service';
import { RecentSearchModel } from '@app/root-store/coach-store/coach.state';
import { StudentFacadeService } from '@app/root-store/student-store/student-facade.service';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'gmu-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss']
})
export class CoachComponent implements OnInit, OnDestroy
{
  studentId: string;
  recentSearches$: Observable<RecentSearchModel[]>;
  errorSubscription: Subscription;
  error: string;
  error$: Observable<string>;

  constructor(
    private coachFacadeService: CoachFacadeService,
    private studentFacadeService: StudentFacadeService,
    private navigationService: NavigationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void
  {
    this.recentSearches$ = this.coachFacadeService.requestCoachRecentSearches();
    this.studentFacadeService.requestClearSelectedStudents();
    console.log(this.route);
    this.error = this.route.snapshot.queryParams.error;
    this.error$ = of(this.error);
  }

  ngOnDestroy(): void
  {
    //this.errorSubscription.unsubscribe();
    //this.coachFacadeService.requestClearRecentSearches();
  }


  onSearchStudent(searchId: string)
  {

    console.log('searching');
    localStorage.setItem('searchId', searchId.trim());
    this.studentFacadeService.requestStudentDetails(searchId.trim());
    this.navigationService.goToStudentViewPage();
  }

}
