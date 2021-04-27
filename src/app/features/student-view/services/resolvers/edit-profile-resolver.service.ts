import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { StudentFacadeService } from '@app/root-store/student-store/student-facade.service';
import { CoachFacadeService } from '@app/root-store/coach-store/coach-facade.service';
import { PathwayFacadeService } from '@app/root-store/pathway-store/pathway-facade.service';
import { Auth } from 'aws-amplify';
import { NavigationService } from '@app/core/services/navigation/navigation.service';



@Injectable({
  providedIn: 'root'
})

export class EditProfileResolverService implements Resolve<void>
{
  constructor
    (
      private studentFacadeService: StudentFacadeService,
      private coachFacadeService: CoachFacadeService,
      private pathwayFacadeService: PathwayFacadeService,
      private navigationService: NavigationService
    ) { }

  resolve(): void
  {
    this.studentFacadeService.clearErrorState();
    this.pathwayFacadeService.requestFullPathwayList();
    this.coachFacadeService.requestCoachList();
    Auth.currentUserInfo().then(userDetails => 
    {
      if (userDetails.attributes?.['custom:organization'] === 'coach')
      {
        localStorage.setItem('role', 'coach');
        this.navigationService.goToStudentViewPage();
      }
      this.studentFacadeService.requestStudentDetails(userDetails.attributes.email);
    }).catch(
      (err) => console.error(err));
  }
}
