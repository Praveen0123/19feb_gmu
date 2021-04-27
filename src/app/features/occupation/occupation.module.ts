import { NgModule } from '@angular/core';

import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OccupationRoutingModule } from './occupation-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { MapOccupationHotspotsModule, MapOccupationAverageSalariesModule } from '@vantage-point/maps';

import { OccupationProfileComponent } from './containers/occupation-profile/occupation-profile.component';

import { CheckMarkBulletItemComponent } from './components/check-mark-bullet-item/check-mark-bullet-item.component';
import { EmployerCardComponent } from './components/employer-card/employer-card.component';
import { OccupationWhatTheyDoComponent } from './components/occupation-what-they-do/occupation-what-they-do.component';
import { OccupationHotSpotComponent } from './components/occupation-hot-spot/occupation-hot-spot.component';
import { OccupationAverageSalariesComponent } from './components/occupation-average-salaries/occupation-average-salaries.component';
import { OccupationSalaryComponent } from './components/occupation-salary/occupation-salary.component';
import { OccupationStatsComponent } from './components/occupation-stats/occupation-stats.component';
import { OccupationEmployerListComponent } from './components/occupation-employer-list/occupation-employer-list.component';
import { OccupationPathwayItemComponent } from './components/occupation-pathway-item/occupation-pathway-item.component';
import { SelectedPathwayComponent } from './components/selected-pathway/selected-pathway.component';
import { SalaryDistributionModule } from '@vantage-point/graphs';


@NgModule({
  imports:
    [
      CommonModule,
      FormsModule,
      MapOccupationAverageSalariesModule,
      MapOccupationHotspotsModule,
      OccupationRoutingModule,
      ReactiveFormsModule,
      SalaryDistributionModule,
      SharedModule
    ],
  declarations:
    [
      CheckMarkBulletItemComponent,
      EmployerCardComponent,
      OccupationProfileComponent,
      OccupationWhatTheyDoComponent,
      OccupationHotSpotComponent,
      OccupationAverageSalariesComponent,
      OccupationSalaryComponent,
      OccupationStatsComponent,
      OccupationEmployerListComponent,
      OccupationPathwayItemComponent,
      SelectedPathwayComponent
    ],
  providers:
    [
      CurrencyPipe
      //    ],
      //
      //  exports:
      //    [
      //      OccupationWhatTheyDoComponent,
      //
    ]


})
export class OccupationModule { }
