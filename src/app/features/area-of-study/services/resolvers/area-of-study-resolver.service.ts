import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AreaOfStudyFacadeService } from '@app/root-store/area-of-study-store/area-of-study-facade.service';


@Injectable({
  providedIn: 'root'
})

export class AreaOfStudyResolverService implements Resolve<void>{

  constructor
    (
      private areaOfStudyFacadeService: AreaOfStudyFacadeService
    ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
    const areaOfStudyId = route.params.areaOfStudyId;
    this.areaOfStudyFacadeService.requestAreaOfStudyById(areaOfStudyId);
  }

}