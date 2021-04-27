import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CoachFacadeService } from '@app/root-store/coach-store/coach-facade.service';
import { PathwayFacadeService } from '@app/root-store/pathway-store/pathway-facade.service';

@Injectable({
  providedIn: 'root'
})
export class AddStudentResolverService implements Resolve<void>
{


  constructor(
    private coachFacadeService: CoachFacadeService,
    private pathwayFacadeService: PathwayFacadeService) { }

  resolve(): void
  {
    this.pathwayFacadeService.requestFullPathwayList();
    this.coachFacadeService.requestCoachList();
  }

}
