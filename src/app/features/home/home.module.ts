import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '@app/shared/shared.module';

import { CourseOutlineBottomSheetComponent } from './components/course-outline-bottom-sheet/course-outline-bottom-sheet.component';
import { CourseOutlineComponent } from './components/course-outline/course-outline.component';
import { CourseWorkAtGlanceComponent } from './components/course-work-at-glance/course-work-at-glance.component';
import { DegreeDetailsSkillDefinitionComponent } from './components/degree-details-skill-definition/degree-details-skill-definition.component';
import { DegreeDetailsTopSkillsComponent } from './components/degree-details-top-skills/degree-details-top-skills.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderMediumComponent } from './components/header-medium/header-medium.component';
import { HeaderSmallComponent } from './components/header-small/header-small.component';
import { HomeComponent } from './containers/home/home.component';
import { NavTabsComponent } from './components/nav-tabs/nav-tabs.component';
import { OccupationListByAreaOfStudyComponent } from './components/occupation-list-by-area-of-study/occupation-list-by-area-of-study.component';
import { OccupationsComponent } from './containers/occupations/occupations.component';
import { OccupationPreviewComponent } from './components/occupation-preview/occupation-preview.component';
import { OccupationPreviewContainerComponent } from './containers/occupation-preview-container/occupation-preview-container.component';
import { PathwayDetailsComponent } from './containers/pathway-details/pathway-details.component';
import { PathwayExplorerComponent } from './containers/pathway-explorer/pathway-explorer.component';
import { WelcomeComponent } from './containers/welcome/welcome.component';

import { LoginModelComponent } from './containers/login-model/login-model.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { RegisterModelComponent } from './containers/register-model/register-model.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { LoginPageFormComponent } from './components/login-page-form/login-page-form.component';
import { SignUpPageComponent } from './containers/sign-up-page/sign-up-page.component';
import { ResetPasswordPageComponent } from './containers/reset-password-page/reset-password-page.component';
import { ConfirmSignUpPageComponent } from './containers/confirm-sign-up-page/confirm-sign-up-page.component';
import { ConfirmSignUpFormComponent } from './components/confirm-sign-up-form/confirm-sign-up-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { ResetPasswordFormComponent } from './components/reset-password-form/reset-password-form.component';
import { FeedbackPageComponent } from './containers/feedback-page/feedback-page.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';


@NgModule({
  imports:
    [
      CommonModule,
      HomeRoutingModule,
      SharedModule,
      FormsModule,
      ReactiveFormsModule
    ],
  declarations:
    [
      CourseOutlineBottomSheetComponent,
      CourseOutlineComponent,
      CourseWorkAtGlanceComponent,
      DegreeDetailsSkillDefinitionComponent,
      DegreeDetailsTopSkillsComponent,
      FooterComponent,
      HeaderMediumComponent,
      HeaderSmallComponent,
      HomeComponent,
      NavTabsComponent,
      OccupationListByAreaOfStudyComponent,
      OccupationPreviewComponent,
      OccupationPreviewContainerComponent,
      OccupationsComponent,
      PathwayDetailsComponent,
      PathwayExplorerComponent,
      WelcomeComponent,
      LoginModelComponent,
      LoginFormComponent,
      RegisterFormComponent,
      RegisterModelComponent,
      LoginPageComponent,
      LoginPageFormComponent,
      SignUpPageComponent,
      ResetPasswordPageComponent,
      ConfirmSignUpPageComponent,
      ConfirmSignUpFormComponent,
      SignUpFormComponent,
      ResetPasswordFormComponent,
      FeedbackPageComponent,
      FeedbackFormComponent,
    ],
  exports:
    [
      FooterComponent,
      HeaderMediumComponent,
      HeaderSmallComponent,
      WelcomeComponent,
      DegreeDetailsTopSkillsComponent
    ],
  providers:
    [
      CurrencyPipe
    ]
})
export class HomeModule { }
