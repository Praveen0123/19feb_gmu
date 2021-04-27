import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachRoutingModule } from './coach-routing.module';
import { SharedModule } from '@app/shared/shared.module';

// COMPONENTS
import { CoachComponent } from './containers/coach/coach.component';
import { CoachRecentSearchesComponent } from './components/coach-recent-searches/coach-recent-searches.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentNotesComponent } from './containers/student-notes/student-notes.component';
import { StudentNotesFormComponent } from './components/student-notes-form/student-notes-form.component';
import { StudentNotesListComponent } from './components/student-notes-list/student-notes-list.component';






@NgModule({
  declarations: [
    CoachComponent,
    CoachRecentSearchesComponent,
    StudentNotesComponent,
    StudentNotesFormComponent,
    StudentNotesListComponent,

  ],
  imports: [
    CommonModule,
    CoachRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CoachModule { }
