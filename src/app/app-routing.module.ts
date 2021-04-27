import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';


const routes: Routes =
  [
    {
      path: '',
      children:
        [
          { path: '', redirectTo: '/home/pathway', pathMatch: 'full' },
          {
            path: 'home',
            loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
            data:
            {
              id: 'home-lazy-loaded-route'
            }
          },
          {
            path: 'example',
            loadChildren: () => import('./features/example/example.module').then(m => m.ExampleModule)
          }
        ]
    },
    {
      path: 'welcome',
      redirectTo: '/home/welcome'
    },
    {
      path: 'area-of-study',
      loadChildren: () => import('./features/area-of-study/area-of-study.module').then(m => m.AreaOfStudyModule)
    },
    {
      path: 'connect-with-coach',
      loadChildren: () => import('./features/connect-with-coach/connect-with-coach.module').then(m => m.ConnectWithCoachModule)
    },
    {
      path: 'occupations',
      loadChildren: () => import('./features/occupation/occupation.module').then(m => m.OccupationModule)
    },
    {
      path: 'student-view',
      loadChildren: () => import('./features/student-view/student-view.module').then(m => m.StudentViewModule)
    },
    {
      path: 'admin',
      loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
    },
    {
      path: 'coach',
      loadChildren: () => import('./features/coach/coach.module').then(m => m.CoachModule)
    },

    {
      path: 'about',
      loadChildren: () => import('./features/product-splash-page/product-splash-page.module').then(m => m.ProductSplashPageModule)
    },

    { path: '**', component: PageNotFoundComponent }
  ];

@NgModule(
  {
    imports:
      [
        RouterModule.forRoot(routes,
          {
            anchorScrolling: 'enabled',
            scrollPositionRestoration: 'enabled',
          })
      ],
    exports:
      [
        RouterModule
      ]
  })
export class AppRoutingModule { }
