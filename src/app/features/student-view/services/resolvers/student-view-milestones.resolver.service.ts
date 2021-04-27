import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NavigationService } from '@app/core/services/navigation/navigation.service';
import { StudentFacadeService } from '@app/root-store/student-store/student-facade.service';
import { UserProfileFacadeService } from '@app/root-store/user-profile-store/user-profile-facade.service';
import Auth from '@aws-amplify/auth';
import { take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class StudentViewMilestonesResolverService implements Resolve<void>
{
  constructor
    (
      private studentFacadeService: StudentFacadeService,
      private navigationService: NavigationService
    ) { }

  resolve(): void
  {
    this.studentFacadeService.clearErrorState();
    Auth.currentUserInfo().then(userDetails => 
    {
      if (userDetails?.attributes?.['custom:organization'] == 'coach')
      {
        this.studentFacadeService.requestStudentDetails((localStorage.getItem('searchId')));
        localStorage.setItem('role', 'coach');
      } else
      {
        this.studentFacadeService.requestStudentDetails(userDetails.attributes?.email);
      }
    }).catch(
      (err) => this.navigationService.goToLoginPage());
  }
}



