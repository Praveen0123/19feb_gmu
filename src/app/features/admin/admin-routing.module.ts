import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS
import { AdminComponent } from './containers/admin/admin.component';
import { AddStudentComponent } from './containers/add-student/add-student.component';
import { ManageStudentComponent } from './containers/manage-student/manage-student.component';
import { ManageStudentDetailsComponent } from './containers/manage-student-details/manage-student-details.component';

// SERVICES
import { StudentDetailsResolverService } from './services/resolvers/student-details-resolver.service';
import { AddStudentResolverService } from './services/resolvers/add-student-resolver.service';
import { AuthGuard } from '@app/shared/guards/auth/auth.guard';
import { StudentNotFoundComponent } from '@app/shared/components/student-not-found/student-not-found.component';


const routes: Routes =
  [
    {
      path: '',
      component: AdminComponent,
      children:
        [
          {
            path: '',
            redirectTo: 'add-student',
            canActivate: [AuthGuard],
            pathMatch: 'full',
          },

          {
            path: 'add-student',
            component: AddStudentComponent,
            canActivate: [AuthGuard],
            resolve: { resolver: AddStudentResolverService }
          },

          {
            path: 'manage-student',
            canActivate: [AuthGuard],
            component: ManageStudentComponent,

          },
          {
            path: 'manage-student/student-not-found',
            canActivate: [AuthGuard],
            component: StudentNotFoundComponent
          },
          {
            path: 'manage-student/:id',
            component: ManageStudentDetailsComponent,
            canActivate: [AuthGuard],
            resolve: { resolver: StudentDetailsResolverService }
          },
        ]
    },

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
