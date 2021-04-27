import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OccupationFacadeService } from '@app/root-store/occupation-store/occupation-facade.service';



@Injectable({
  providedIn: 'root'
})

export class OccupationProfileResolverService implements Resolve<void>
{
  constructor
    (
      private occupationFacadeService: OccupationFacadeService
    ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void
  {
    const occupationId: string = route.params.id;
    this.occupationFacadeService.requestOccupationDetails(occupationId);
  }
}
