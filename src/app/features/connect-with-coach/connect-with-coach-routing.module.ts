import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectWithCoachComponent } from './containers/connect-with-coach/connect-with-coach.component';
import { ConnectWithCoachResolverService } from './services/resolvers/connect-with-coach-resolver.service';


const routes: Routes =
  [
    {
      path: '',
      component: ConnectWithCoachComponent,
      resolve: { resolver: ConnectWithCoachResolverService }
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectWithCoachRoutingModule { }
