import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { GoogleSheetsDbService } from 'ng-google-sheets-db';

/**
 * Source: https://www.npmjs.com/package/ng-google-sheets-db
 */

// @todo - finish mapping with watch.ts
const sheetToModelMapping = {
  // model | sheet
  manufacturer: "Manufacturer",
  model: "Model",
  sizeWidth: "Width",
  sizeLength: "L2L Width",
  thickness: "Thickness",
  lugWitdh: "Lug Width",
  movement: {
    _prefix: "Movement ",
    manufacturer: "Manufacturer",
    winding: "Winding",
    bph: "BPH",
  },
  dial: "Dials",
  lume: {
    _prefix: "Lume ",
    product: "Product",
    colour: "Colour",
  },
  bezel: {
    _prefix: "Bezel ",
    insertMaterial: "Material",
    clicks: "Clicks",
    colour: "Colour",
  },
  strap: {
    _prefix: "Strap ",
    material: "Material",
  },
  warranty: "Warranty",
  link: {
    _prefix: "Link ",
    url: "URL",
    readable: "Readable",
  },
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


