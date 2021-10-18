import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms"

import { API_KEY, GoogleSheetsDbService } from 'ng-google-sheets-db';
import { MatTableFilterModule } from 'mat-table-filter'

import { AnalyticsService } from '../utils/analytics.service';
import { MaterialImportModule } from './material-import/material-import.module';
import { TableComponent } from './table/table.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialImportModule,
    MatTableFilterModule,
    FormsModule,
  ],
  providers: [
    AnalyticsService,
    {
      provide: API_KEY,
      useValue: environment.key
    },
    GoogleSheetsDbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
