import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { NavigationService } from '@app/core/services/navigation/navigation.service';
import { StudetProfileFacadeService } from '@app/root-store/student-profile-store/student-profile-facade.service';
import { StudentFacadeService } from '@app/root-store/student-store/student-facade.service';
import { Auth } from 'aws-amplify';



@Injectable({
  providedIn: 'root'
})

export class StudentProfileSkillsResolver implements Resolve<void>
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
        console.log('searching for ' + (localStorage.getItem('searchId')));
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
