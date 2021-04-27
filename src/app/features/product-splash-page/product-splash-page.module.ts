import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { MasonSplashPageComponent } from './containers/mason-splash-page/mason-splash-page.component';
import { ProductSplashPageRoutingModule } from './product-splash-page-routing.module';
import { MasonSplashPageListComponent } from './components/mason-splash-page-list/mason-splash-page-list.component';
import { GetToKnowPopupComponent } from './components/get-to-know-popup/get-to-know-popup.component';
import { MasonSplashPageVideoComponent } from './components/mason-splash-page-video/mason-splash-page-video.component';
import { MasonSplashListMobileComponent } from './components/mason-splash-list-mobile/mason-splash-list-mobile.component';




@NgModule({
  declarations: [
    MasonSplashPageComponent,
    MasonSplashPageListComponent,
    MasonSplashPageVideoComponent,
    GetToKnowPopupComponent,
    MasonSplashListMobileComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ProductSplashPageRoutingModule
  ]
})
export class ProductSplashPageModule { }
