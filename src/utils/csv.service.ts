import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { GoogleSheetsDbService } from 'ng-google-sheets-db';

const sheetToModelMapping = {
  // model | sheet
  manufacturer: "Manufacturer",
  model: "Model",
  sizeWidth: "Width",
  lugWitdh: "Lug Width",
  movement: "Movement",
  warranty: "Warranty",
  link: "Link",
};


const SHEET = '1WNZ5fnJ6A3d3DdjJSiN95JIcdoCjfz3OXh8g4bI70rs';
const WORKSHEET = 'main';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  characters$: Observable<any[]>;

  private url : string = `https://docs.google.com/spreadsheets/d/${SHEET}/gviz/tq?tqx=out:json`;

  constructor(private http: HttpClient,
    private googleSheetsDbService: GoogleSheetsDbService) { }

  getSheet(): Observable<any> {
    return this.googleSheetsDbService.get<any>(SHEET, WORKSHEET, sheetToModelMapping);
  }

}


