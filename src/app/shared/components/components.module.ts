import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomMaterialModule } from '../material/custom-material.module';
import { NgxPrintModule } from 'ngx-print';

import { BackButtonComponent } from './buttons/back-button/back-button.component';
import { ConnectWithCoachComponent } from './connect-with-coach/connect-with-coach.component';
import { DialogComponent } from './dialog/dialog.component';
import { OccupationCardComponent } from './occupation-card/occupation-card.component';
import { OccupationListScrollComponent } from './occupation-list-scroll/occupation-list-scroll.component';
import { PathwayExplorerFormComponent } from './pathway-explorer-form/pathway-explorer-form.component';
import { PipesModule } from '../pipes/pipes.module';
import { RoadmapMediumComponent } from './roadmap/roadmap-medium/roadmap-medium.component';
import { RoadmapSmallComponent } from './roadmap/roadmap-small/roadmap-small.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SkillListComponent } from './skill-list/skill-list.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { VideoComponent } from './video/video.component';
import { AspectRatioComponent } from './aspect-ratio/aspect-ratio.component';
import { ReadMoreLessComponent } from './read-more-less/read-more-less.component';
import { OccupationAutoCompleteComponent } from './occupation-auto-complete/occupation-auto-complete.component';

import { StudentViewSkillRoadmapSharedComponent } from './student-view-skill-roadmap-shared/student-view-skill-roadmap-shared.component';
import { StudentViewSkillsRoadmapCourseComponent } from './student-view-skills-roadmap-course/student-view-skills-roadmap-course.component';
import { StudentViewSkillRoadmapCareerReadyComponent } from './student-view-skill-roadmap-career-ready/student-view-skill-roadmap-career-ready.component';
import { StudentViewMilestonesComponent } from './student-view-milestones/student-view-milestones.component';
import { SkillsProfileComponent } from './skills-profile/skills-profile.component';
import { SkillsViewComponent } from './skills-view/skills-view.component';
import { SkillsTranscriptComponent } from './skills-transcript/skills-transcript.component';
import { StudentViewDetailsComponent } from './student-view-details/student-view-details.component';
import { CareerOccupationsComponent } from './career-occupations/career-occupations.component';
import { CareerOpportunitiesComponent } from './career-opportunities/career-opportunities.component';



// 3rd party
import { AutoCompleteOccupationsModule } from '@vantage-point/autocomplete-library';
import { SearchBoxFormComponent } from './search-box-form/search-box-form.component';
import { StudentNotFoundComponent } from './student-not-found/student-not-found.component';
import { PathwayYearExplorerComponent } from './pathway-year-explorer/pathway-year-explorer.component';
import { FaqDialogComponent } from './faq-dialog/faq-dialog.component';
import { FaqOpenButtonComponent } from './faq-open-button/faq-open-button.component';

@NgModule({
  imports:
    [
      CommonModule,
      CustomMaterialModule,
      FormsModule,
      PipesModule,
      ReactiveFormsModule,
      ScrollingModule,
      NgxPrintModule,

      // 3rd party
      AutoCompleteOccupationsModule
    ],
  declarations:
    [
      AspectRatioComponent,
      BackButtonComponent,
      ConnectWithCoachComponent,
      DialogComponent,
      OccupationAutoCompleteComponent,
      OccupationCardComponent,
      OccupationListScrollComponent,
      PathwayExplorerFormComponent,
      ReadMoreLessComponent,
      RoadmapMediumComponent,
      RoadmapSmallComponent,
      SectionHeaderComponent,
      SidenavComponent,
      SkillListComponent,
      SpinnerComponent,
      VideoComponent,
      SearchBoxFormComponent,
      AspectRatioComponent,
      ReadMoreLessComponent,
      StudentViewSkillRoadmapSharedComponent,
      StudentViewSkillsRoadmapCourseComponent,
      StudentViewSkillRoadmapCareerReadyComponent,
      StudentViewMilestonesComponent,
      SkillsProfileComponent,
      SkillsViewComponent,
      SkillsTranscriptComponent,
      StudentViewDetailsComponent,
      CareerOccupationsComponent,
      CareerOpportunitiesComponent,
      StudentNotFoundComponent,
      PathwayYearExplorerComponent,
      FaqDialogComponent,
      FaqOpenButtonComponent

    ],
  exports:
    [
      AspectRatioComponent,
      BackButtonComponent,
      ConnectWithCoachComponent,
      DialogComponent,
      OccupationAutoCompleteComponent,
      OccupationCardComponent,
      OccupationListScrollComponent,
      PathwayExplorerFormComponent,
      PathwayYearExplorerComponent,
      ReadMoreLessComponent,
      RoadmapMediumComponent,
      RoadmapSmallComponent,
      SectionHeaderComponent,
      SidenavComponent,
      SkillListComponent,
      SpinnerComponent,
      VideoComponent,
      SearchBoxFormComponent,
      AspectRatioComponent,
      ReadMoreLessComponent,
      StudentViewSkillRoadmapSharedComponent,
      StudentViewSkillsRoadmapCourseComponent,
      StudentViewSkillRoadmapCareerReadyComponent,
      StudentViewMilestonesComponent,
      SkillsProfileComponent,
      SkillsViewComponent,
      SkillsTranscriptComponent,
      StudentViewDetailsComponent,
      CareerOccupationsComponent,
      CareerOpportunitiesComponent,
      StudentNotFoundComponent,
      FaqDialogComponent,
      FaqOpenButtonComponent
    ]
})
export class ComponentsModule { }
