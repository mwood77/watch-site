import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatAccordion } from '@angular/material/expansion';

import { BehaviorSubject } from 'rxjs';

import { CsvService } from 'src/utils/csv.service';
import { AnalyticsService } from '../../utils/analytics.service';
import { Watch } from '../models/watch';
import { environment } from 'src/environments/environment';

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

  version: string = environment.version;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatAccordion) accordion: MatAccordion;

  dataSource: any;
  displayedColumns: Array<string>;
  columns = new BehaviorSubject<Array<string>>([]);
  isLoadingResults = true;

  expandedElement: Watch | null;

  constructor(
    private analytics: AnalyticsService,
    private csv: CsvService) { }

  openLink(element:any): void {
    this.analytics.eventEmitter(`open_url_${element.link.readable}`, 'Link-clicked', 'click', `${element.link.readable}`);
    window.open(element.link.url);
  }
  openReview(element:any): void {
    this.analytics.eventEmitter(`open_url_${element.link.readable}`, 'Link-clicked', 'click', `${element.link.readable}`);
    window.open(element.review);
  }

  updateColumns(columns: Array<string>) {
    this.columns.next(columns);
  }


  searchTable(input: string) {
    this.dataSource.filter = input.toLocaleLowerCase().trim();
  }

  ngOnInit() {
    // detect mobile browser by pointer hover
    if(window.matchMedia("(any-hover: none)").matches) {
      console.warn('using mobile headers')
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
      }
    )
  }

}
