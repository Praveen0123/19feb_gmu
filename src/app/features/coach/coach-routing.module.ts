import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentViewComponent } from '../student-view/containers/student-view/student-view.component';
import { CoachComponent } from './containers/coach/coach.component';
import { StudentNotesComponent } from './containers/student-notes/student-notes.component';

const routes: Routes = [
  {
    path: '', component: CoachComponent,
    // children: [
    //   { path: '', redirectTo: 'search', pathMatch: 'full' },
    //   { path: 'search', component: CoachComponent },
    //   { path: 'notes', component: StudentNotesComponent }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachRoutingModule { }
