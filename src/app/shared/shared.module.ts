import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';
import { CustomMaterialModule } from './material/custom-material.module';



@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    CustomMaterialModule,
    DirectivesModule,
    PipesModule,

  ],
  declarations:
    [],
  exports:
    [
      ComponentsModule,
      CustomMaterialModule,
      DirectivesModule,
      PipesModule
    ]
})
export class SharedModule { }
