import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AnalyticsService } from '../utils/analytics.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialImportModule } from './material-import/material-import.module';
import { TableComponent } from './table/table.component';

import { API_KEY, GoogleSheetsDbService } from 'ng-google-sheets-db';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialImportModule,
  ],
  providers: [
    AnalyticsService,
    {
      provide: API_KEY,
      // @todo - key comes from repo secrets
      useValue: ''
    },
    GoogleSheetsDbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
