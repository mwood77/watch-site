import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatTableFilter } from 'mat-table-filter';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from "@angular/cdk/clipboard"

import { CsvService } from 'src/utils/csv.service';
import { AnalyticsService } from '../../utils/analytics.service';
import { Movement, Watch, Strap, Luminous, Bezel } from '../models/watch';
import { HttpParams, HttpRequest } from '@angular/common/http';

interface Price {
  value: string;
  viewValue: string
}

const prices: Array<Price> = [
  { value: '', viewValue: 'Any' },
  { value: '0', viewValue: '$0-$100' },
  { value: '1', viewValue: '$100-$200' },
  { value: '2', viewValue: '$200-$300' },
  { value: '3', viewValue: '$300+' },
]

const tableHeaders: Array<string> = [
	'manufacturer',
	'model',
	'sizeWidth',
	'lugWidth',
  'sizeLength',
  'thickness',
	'movementManufacturer',
	'winding',
	'warranty',
	'Purchase Link',
];

const tableHeaderMobile: Array<string> = [
	'manufacturer',
	'model',
	'sizeWidth',
  'sizeLength',
  'thickness',
	'movementManufacturer',
	'Purchase Link',
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent implements OnInit, AfterViewInit {
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatAccordion) accordion: MatAccordion;

  expandedElement: Watch | null;

  version: string = environment.version;
  searchParams: string = '';

  dataSource: any;
  isLoadingResults = true;
  displayedColumns: Array<string>;
  pricing = prices;

  filterEntity: Watch;
  filterType: MatTableFilter;

  constructor(
    private analytics: AnalyticsService,
    private route: ActivatedRoute,
    private csv: CsvService,
    private _snackBar: MatSnackBar,
    private clipboard: Clipboard) { }

  openLink(element: any): void {
    this.analytics.eventEmitter(`open_url_${element.link.readable}`, 'Link-clicked', 'click', `${element.link.readable}`);
    window.open(element.link.url);
  }

  openReview(element: any): void {
    this.analytics.eventEmitter(`open_url_${element.link.readable}`, 'review-clicked', 'click', `${element.link.readable}`);
    window.open(element.review);
  }

  // @todo - super hackish, fix this
  generateLink() {
    const URL = 'https://aliwatchfinder.com'
    let obj: any = {};

    if ( this.filterEntity.lugWidth != '' ) {
      obj.lug_width = this.filterEntity.lugWidth;
    }
    if ( this.filterEntity.homage != '' || undefined ) {
      console.log(this.filterEntity.homage)
      obj.search = this.filterEntity.homage;
    }
    if ( this.filterEntity.sizeWidth != '' ) {
      obj.case_width = this.filterEntity.sizeWidth;
    }
    if ( this.filterEntity.dial != '' ) {
      obj.dial_color = this.filterEntity.dial;
    }
    if ( this.filterEntity.price != '' ) {
      obj.price = this.filterEntity.price;
    }

    const queryParamsString = new HttpParams( { fromObject: obj });
    this.clipboard.copy(URL + "?" + queryParamsString.toString());

    this._snackBar.open('URL copied to clipboard', 'OK', {
      duration: 3500
    });
  }

  ngOnInit() {
    this.filterEntity = new Watch();
    this.filterEntity.lugWidth = '';
    this.filterEntity.sizeWidth = '';
    this.filterEntity.dial = '';
    this.filterEntity.homage = '';
    this.filterEntity.movement = new Movement();
    this.filterEntity.strap = new Strap();
    this.filterEntity.bezel = new Bezel();
    this.filterEntity.lume = new Luminous();

    // set default price select
    this.filterEntity.price = '';

    this.filterType = MatTableFilter.ANYWHERE;

    // detect mobile browser by pointer hover
    if(window.matchMedia("(any-hover: none)").matches) {
      console.warn('Using mobile headers')
      this.displayedColumns = tableHeaderMobile;
    } else {
      this.displayedColumns = tableHeaders;
    }
  }

  ngAfterViewInit() {
    this.csv.getSheet().subscribe(
      response => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;

        this.route.queryParams.subscribe(
          params => {
            if ( Object.keys(params).length !== 0 )
              
              // @todo - super hackish, fix this
              Object.keys(params).forEach(
                key => {
                  
                  if (key === 'search') {
                    this.searchParams = params.search;
                    this.filterEntity.homage = this.searchParams;
                  }

                  if (key === 'price') {
                    this.filterEntity.price = params.price;
                  }

                  if (key === 'lug_width') {
                    this.filterEntity.lugWidth = params.lug_width;
                  }

                  if (key === 'dial_color') {
                    this.filterEntity.dial = params.dial_color;
                  }
                
                  if (key === 'case_width') {
                    this.filterEntity.sizeWidth = params.case_width;
                  }

              });
          });
            
        this.isLoadingResults = false;
    });
  }

}
