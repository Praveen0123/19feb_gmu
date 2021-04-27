import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasonSplashPageComponent } from './containers/mason-splash-page/mason-splash-page.component';


const routes: Routes =
  [
    {
      path: '',
      component: MasonSplashPageComponent,

    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductSplashPageRoutingModule { }
