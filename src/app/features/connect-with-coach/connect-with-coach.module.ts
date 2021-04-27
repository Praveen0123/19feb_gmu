import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';

import { ConnectWithCoachRoutingModule } from './connect-with-coach-routing.module';
import { ConnectWithCoachComponent } from './containers/connect-with-coach/connect-with-coach.component';
import { ConnectWithCoachFormComponent } from './components/connect-with-coach-form/connect-with-coach-form.component';


@NgModule({
  imports:
    [
      CommonModule,
      ConnectWithCoachRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      SharedModule,

      // 3rd party
      NgxMaskModule.forRoot()
    ],
  declarations:
    [
      ConnectWithCoachComponent,
      ConnectWithCoachFormComponent
    ]
})
export class ConnectWithCoachModule { }
