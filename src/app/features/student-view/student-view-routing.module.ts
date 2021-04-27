import { NgModule } from '@angular/core';
import { StudentViewComponent } from './containers/student-view/student-view.component';
import { StudentViewSkillsRoadmapComponent } from './containers/student-view-skills-roadmap/student-view-skills-roadmap.component';
import { StudentViewSkillsProfileComponent } from './containers/student-view-skills-profile/student-view-skills-profile.component';
import { StudentViewSkillsTranscriptComponent } from './containers/student-view-skills-transcript/student-view-skills-transcript.component';
import { StudentViewSkillsMilestonesComponent } from './containers/student-view-skills-milestones/student-view-skills-milestones.component';
import { RouterModule, Routes } from '@angular/router';
import { OccupationProfileResolverService } from './services/resolvers/student-view-roadmap-resolver.service';
import { StudentProfileSkillsResolver } from './services/resolvers/student-profile-skills.resolver.service';
import { StudentViewMilestonesResolverService } from './services/resolvers/student-view-milestones.resolver.service';
import { EditProfilePageComponent } from './containers/edit-profile-page/edit-profile-page.component';
import { EditProfileResolverService } from './services/resolvers/edit-profile-resolver.service';


const routes: Routes = [

  {
    path: '',
    component: StudentViewComponent,
    children: [
      {
        path: '',
        redirectTo: 'student-view-skills-milestones',
        pathMatch: 'full',
      },
      {
        path: 'student-view-skills-milestones',
        component: StudentViewSkillsMilestonesComponent,
        resolve: { resolver: StudentViewMilestonesResolverService }
      },

      {
        path: 'student-view-skills-roadmap',
        component: StudentViewSkillsRoadmapComponent,
        resolve: {
          resolver: OccupationProfileResolverService,
        }
      },
      {
        path: 'student-view-skills-profile',
        component: StudentViewSkillsProfileComponent,
        resolve: { resolver: StudentProfileSkillsResolver }
      },
      {
        path: 'student-view-skills-transcript',
        component: StudentViewSkillsTranscriptComponent,
        resolve: { resolver: StudentProfileSkillsResolver }
      }
    ]
  },
  {
    path: 'first-time-profile',
    component: EditProfilePageComponent,
    resolve: { resolver: EditProfileResolverService }

  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})


export class StudentViewRoutingModule { }
