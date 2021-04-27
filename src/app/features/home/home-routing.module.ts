import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './containers/home/home.component';
import { PathwayDetailsComponent } from './containers/pathway-details/pathway-details.component';
import { PathwayExplorerComponent } from './containers/pathway-explorer/pathway-explorer.component';
import { OccupationsComponent } from './containers/occupations/occupations.component';
import { OccupationPreviewContainerComponent } from './containers/occupation-preview-container/occupation-preview-container.component';
import { WelcomeComponent } from './containers/welcome/welcome.component';

import { AreaOfStudyListResolverSilentlyService } from './services/resolvers/area-of-study-list-resolver-silently.service';
import { AreaOfStudyListResolverService } from './services/resolvers/area-of-study-list-resolver.service';
import { OccupationPreviewResolverService } from './services/resolvers/occupation-preview-resolver.service';
import { PathwayDetailsResolverService } from './services/resolvers/pathway-details-resolver.service';
import { PathwayListResolverService } from './services/resolvers/pathway-list-resolver.service';
import { LoginModelComponent } from './containers/login-model/login-model.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { SignUpPageComponent } from './containers/sign-up-page/sign-up-page.component';
import { ConfirmSignUpPageComponent } from './containers/confirm-sign-up-page/confirm-sign-up-page.component';
import { ResetPasswordPageComponent } from './containers/reset-password-page/reset-password-page.component';
import { FeedbackPageComponent } from './containers/feedback-page/feedback-page.component';


const routes: Routes =
  [
    {
      path: '',
      component: HomeComponent,
      children:
        [
          {
            path: '',
            redirectTo: 'pathway',
            pathMatch: 'full'
          },
          {
            path: 'pathway',
            component: PathwayExplorerComponent,
            resolve:
            {
              pathwayList: PathwayListResolverService,
              areaOfStudyList: AreaOfStudyListResolverSilentlyService
            }
          },
          {
            path: 'pathway/:id',
            component: PathwayDetailsComponent,
            resolve:
            {
              pathwayDetails: PathwayDetailsResolverService
            }
          },
          {
            path: 'occupations',
            component: OccupationsComponent,
            children: [],
            resolve:
            {
              pathwayList: PathwayListResolverService,
              areaOfStudyList: AreaOfStudyListResolverService
            }
          },
          {
            path: 'occupations/:id',
            component: OccupationPreviewContainerComponent,
            children: [],
            resolve:
            {
              occupationPreview: OccupationPreviewResolverService,
              pathwayList: PathwayListResolverService,
              areaOfStudyList: AreaOfStudyListResolverService
            }
          }
        ]
    },
    {
      path: 'welcome',
      component: WelcomeComponent
    },
    {
      path: 'login',
      component: LoginPageComponent
    },
    {
      path: 'register',
      component: SignUpPageComponent
    },
    {
      path: 'confirm-registration',
      component: ConfirmSignUpPageComponent
    },
    {
      path: 'forgot-password',
      component: ResetPasswordPageComponent
    },
    {
      path: 'feedback',
      component: FeedbackPageComponent
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
