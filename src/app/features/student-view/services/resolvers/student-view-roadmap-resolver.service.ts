import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NavigationService } from '@app/core/services/navigation/navigation.service';
import { StudentFacadeService } from '@app/root-store/student-store/student-facade.service';
import { Auth } from 'aws-amplify';



@Injectable({
  providedIn: 'root'
})

export class OccupationProfileResolverService implements Resolve<void>
{
  constructor
    (
      private studentFacadeService: StudentFacadeService,
      private navigationService: NavigationService
    ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void
  {
    this.studentFacadeService.clearErrorState();
    Auth.currentUserInfo().then(userDetails => 
    {
      if (userDetails?.attributes?.['custom:organization'] == 'coach')
      {
        localStorage.setItem('role', 'coach');
        this.studentFacadeService.requestStudentDetails((localStorage.getItem('searchId')));
      } else
      {
        this.studentFacadeService.requestStudentDetails(userDetails.attributes?.email);
      }
    }).catch(
      (err) => this.navigationService.goToLoginPage());
  }
}




