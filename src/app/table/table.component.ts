import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';

import { CsvService } from 'src/utils/csv.service';
import { AnalyticsService } from '../../utils/analytics.service';
import { Movement, Watch, Strap, Luminous, Bezel } from '../models/watch';
import { environment } from 'src/environments/environment';
import { MatTableFilter } from 'mat-table-filter';

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
  searchParams: string = "";

  dataSource: any;
  isLoadingResults = true;
  displayedColumns: Array<string>;
  pricing = prices;

  filterEntity: Watch;
  filterType: MatTableFilter;

  constructor(
    private analytics: AnalyticsService,
    private route: ActivatedRoute,
    private csv: CsvService) { }

  openLink(element:any): void {
    this.analytics.eventEmitter(`open_url_${element.link.readable}`, 'Link-clicked', 'click', `${element.link.readable}`);
    window.open(element.link.url);
  }
  openReview(element:any): void {
    this.analytics.eventEmitter(`open_url_${element.link.readable}`, 'Link-clicked', 'click', `${element.link.readable}`);
    window.open(element.review);
  }

  trimWhitespace(input: string): void {
    this.searchParams = input.trim();
  }


  searchTable(input: string) {
    this.dataSource.filter = input.toLocaleLowerCase().trim();
  }

  ngOnInit() {
    this.filterEntity = new Watch();
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
        this.isLoadingResults = false;

        this.route.queryParams.subscribe(
          params => {
            if ( Object.keys(params).length !== 0 && params.hasOwnProperty("search")) {
              this.searchParams = params.search;
              this.filterEntity.homage = this.searchParams;
            }
          }
        )

      }
    )
  }

}
