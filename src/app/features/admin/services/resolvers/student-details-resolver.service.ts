import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { NavigationService } from '@app/core/services/navigation/navigation.service';
import { CoachFacadeService } from '@app/root-store/coach-store/coach-facade.service';
import { PathwayFacadeService } from '@app/root-store/pathway-store/pathway-facade.service';
import { Student } from '@gql';
import { map, take } from 'rxjs/operators';
import { StudentFacadeService } from '../../../../root-store/student-store/student-facade.service';

@Injectable({
  providedIn: 'root'
})
export class StudentDetailsResolverService implements Resolve<void>
{


  constructor(
    private studentFacadeService: StudentFacadeService,
    private navigationService: NavigationService,
    private coachFacadeService: CoachFacadeService,
    private pathwayFacadeService: PathwayFacadeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void
  {
    const studentIdOrEmail: string = route.params.id;
    this.studentFacadeService.requestStudentDetails(studentIdOrEmail);
    this.pathwayFacadeService.requestPathwayListFromAdminPage();
    this.coachFacadeService.requestCoachList();
    // CHECK WHETHER STUDENT DETAILS IS AVAILABLE OR NOT BASED ON STUDENT iD OTHERWISE NAVIGATE TO THE STUDENT NOT FOUND PAGE

  }

}
