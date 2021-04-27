import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

// APPLICATION MODULES
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { httpInterceptorProviders } from './core/interceptors';
import { HomeModule } from './features/home/home.module';
import { RootStoreModule } from './root-store/root-store.module';
import { GraphQLModule } from './graphql.module';

// 3rd PARTY
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  imports:
    [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,


      // APPLICATION MODULES
      AppRoutingModule,
      CoreModule,
      GraphQLModule,
      HomeModule,

      // APPLICATION STATE
      RootStoreModule,

      // 3RD PARTY
      NgIdleKeepaliveModule.forRoot(),
      NgxSpinnerModule

    ],
  declarations:
    [
      AppComponent
    ],
  providers:
    [
      httpInterceptorProviders
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap:
    [
      AppComponent
    ]
})
export class AppModule { }
