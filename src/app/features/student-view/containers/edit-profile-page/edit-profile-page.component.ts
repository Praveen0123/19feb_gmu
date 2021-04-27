import { Component, OnInit } from '@angular/core';
import { NavigationService } from '@app/core/services/navigation/navigation.service';
import { CoachFacadeService } from '@app/root-store/coach-store/coach-facade.service';
import { PathwayFacadeService } from '@app/root-store/pathway-store/pathway-facade.service';
import { StudentFacadeService } from '@app/root-store/student-store/student-facade.service';
import { UserProfileFacadeService } from '@app/root-store/user-profile-store/user-profile-facade.service';
import { Coach, Pathway, Student, StudentInput } from '@gql';
import { Auth } from 'aws-amplify';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'gmu-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss']
})
export class EditProfilePageComponent implements OnInit
{

  pathwayList$: Observable<Pathway[]>;
  coachList$: Observable<Coach[]>;
  alive = true;

  subscription: Subscription;
  sub2: Subscription;

  constructor(
    private pathwayFacadeService: PathwayFacadeService,
    private coachFacadeService: CoachFacadeService,
    private studentFacadeService: StudentFacadeService,
    private navigationService: NavigationService,
    private userProfileFacadeService: UserProfileFacadeService
  ) { }

  onStudentFormSubmit(studentInput: StudentInput)
  {
    Auth.currentUserInfo().then(
      user =>
      {

        studentInput.firstName = user.attributes.given_name;
        studentInput.email = user.attributes.email;
        studentInput.lastName = user.attributes.family_name;
        studentInput.studentId = user.attributes['custom:studentid'];
        //console.log(studentInput);
        this.studentFacadeService.requestToSaveStudentForm(studentInput);
      }
    );

  }

  ngOnInit(): void
  {
    this.coachFacadeService.requestCoachList();
    this.pathwayList$ = this.pathwayFacadeService.getPathwayList();
    this.coachList$ = this.coachFacadeService.getCoachList();
    this.sub2 = this.userProfileFacadeService.getUserDetails().subscribe(
      x =>
      {
        if (x?.isCoach)
        {
          this.navigationService.goToStudentViewPage();
        }
      }
    );
    this.subscription = this.studentFacadeService.getStudent().subscribe(x =>
    {
      if (x && x.pathway)
      {
        this.navigationService.goToStudentViewPage();
      }
    });
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
    this.sub2.unsubscribe();
  }

}
