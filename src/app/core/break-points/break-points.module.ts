import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BREAKPOINT } from '@angular/flex-layout';
import { BREAKPOINT_LANDSCAPE, BREAKPOINT_PORTRAIT, BREAKPOINT_RETINA2, BREAKPOINT_RETINA3, BREAKPOINT_STANDALONE } from './break-points';


@NgModule({
  imports:
    [
      CommonModule
    ],
  declarations:
    [

    ]
})
export class BreakPointsModule
{
  static forRoot(): ModuleWithProviders<BreakPointsModule>
  {
    return {
      ngModule: BreakPointsModule,
      providers:
        [
          {
            provide: BREAKPOINT,
            useValue: BREAKPOINT_LANDSCAPE,
            multi: true
          },
          {
            provide: BREAKPOINT,
            useValue: BREAKPOINT_PORTRAIT,
            multi: true
          },
          {
            provide: BREAKPOINT,
            useValue: BREAKPOINT_RETINA2,
            multi: true
          },
          {
            provide: BREAKPOINT,
            useValue: BREAKPOINT_RETINA3,
            multi: true
          },
          {
            provide: BREAKPOINT,
            useValue: BREAKPOINT_STANDALONE,
            multi: true
          }
        ]
    };
  }
}
