// MODULES
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { StudentViewRoutingModule } from './student-view-routing.module';



// COMPONENTS
import { StudentViewComponent } from './containers/student-view/student-view.component';
import { StudentViewSkillsComponent } from './containers/student-view-skills/student-view-skills.component';
import { StudentViewSkillsRoadmapComponent } from './containers/student-view-skills-roadmap/student-view-skills-roadmap.component';
import { StudentViewSkillsProfileComponent } from './containers/student-view-skills-profile/student-view-skills-profile.component';
import { StudentViewSkillsTranscriptComponent } from './containers/student-view-skills-transcript/student-view-skills-transcript.component';
import { StudentViewSkillsMilestonesComponent } from './containers/student-view-skills-milestones/student-view-skills-milestones.component';
import { EditProfilePageComponent } from './containers/edit-profile-page/edit-profile-page.component';
import { EditProfileFormComponent } from './components/edit-profile-form/edit-profile-form.component';



@NgModule({
  declarations: [StudentViewComponent, StudentViewSkillsComponent, StudentViewSkillsRoadmapComponent, StudentViewSkillsProfileComponent, StudentViewSkillsTranscriptComponent, StudentViewSkillsMilestonesComponent, EditProfilePageComponent, EditProfileFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StudentViewRoutingModule,
  ]
})
export class StudentViewModule { }
