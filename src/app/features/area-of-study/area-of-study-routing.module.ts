import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OccupationListComponent } from './containers/occupation-list/occupation-list.component';
import { AreaOfStudyResolverService } from './services/resolvers/area-of-study-resolver.service';


const routes: Routes =
  [
    {
      path: '',
      component: OccupationListComponent,
    },

    {
      path: 'occupation-list/:areaOfStudyId',
      component: OccupationListComponent,
      resolve: { resolver: AreaOfStudyResolverService }
    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaOfStudyRoutingModule { }
