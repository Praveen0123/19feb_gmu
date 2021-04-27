
// MODULES
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

// COMPONENTS
import { AdminComponent } from './containers/admin/admin.component';
import { AdminNavTabComponent } from './components/admin-nav-tab/admin-nav-tab.component';
import { AddStudentComponent } from './containers/add-student/add-student.component';
import { ManageStudentComponent } from './containers/manage-student/manage-student.component';
import { AddStudentFormComponent } from './components/add-student-form/add-student-form.component';
import { StudentFormSubmitSuccessComponent } from './components/student-form-submit-success/student-form-submit-success.component';
import { ManageStudentDetailsComponent } from './containers/manage-student-details/manage-student-details.component';
import { SearchBoxFormComponent } from './components/search-box-form/search-box-form.component';


@NgModule({
  imports:
    [
      CommonModule,
      SharedModule,
      FormsModule,
      ReactiveFormsModule,
      AdminRoutingModule
    ],
  declarations:
    [
      AdminComponent,
      AdminNavTabComponent,
      AddStudentComponent,
      ManageStudentComponent,
      AddStudentFormComponent,
      StudentFormSubmitSuccessComponent,
      ManageStudentDetailsComponent,
      SearchBoxFormComponent
    ]

})
export class AdminModule { }
