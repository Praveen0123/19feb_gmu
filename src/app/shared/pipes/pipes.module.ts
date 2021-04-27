import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalarySuffixPipe } from './salarySuffix/salary-suffix.pipe';
import { SortByTypesPipe } from './sortByTypes/sort-by-types.pipe';


@NgModule({
  imports:
    [
      CommonModule
    ],
  declarations:
    [
      SalarySuffixPipe,
      SortByTypesPipe
    ],
  exports:
    [
      SalarySuffixPipe,
      SortByTypesPipe
    ]
})
export class PipesModule { }
