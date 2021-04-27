import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { AreaOfStudyRoutingModule } from './area-of-study-routing.module';

import { AreaOfStudyOccupationListComponent } from './components/area-of-study-occupation-list/area-of-study-occupation-list.component';
import { OccupationListComponent } from './containers/occupation-list/occupation-list.component';



@NgModule({
  imports:
    [
      CommonModule,
      AreaOfStudyRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      SharedModule
    ],
  declarations:
    [
      AreaOfStudyOccupationListComponent,
      OccupationListComponent
    ]
})
export class AreaOfStudyModule { }
