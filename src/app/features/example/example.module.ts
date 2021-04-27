import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleRoutingModule } from './example-routing.module';
import { ExampleComponent } from './containers/example/example.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  imports:
    [
      CommonModule,
      ExampleRoutingModule,
      SharedModule
    ],
  declarations:
    [
      ExampleComponent
    ]
})
export class ExampleModule { }
