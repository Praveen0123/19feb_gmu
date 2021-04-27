import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakPointsModule } from './break-points/break-points.module';
import { SharedModule } from '@app/shared/shared.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


@NgModule({
  imports:
    [
      CommonModule,

      BreakPointsModule.forRoot(),
      SharedModule
    ],
  declarations:
    [

    PageNotFoundComponent],
  exports:
    [
      SharedModule
    ]
})
export class CoreModule { }
