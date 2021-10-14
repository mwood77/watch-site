import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { CsvService } from 'src/utils/csv.service';
import { AnalyticsService } from '../../utils/analytics.service';

const tableHeaders: Array<string> = [
	'manufacturer',
	'model',
	'sizeWidth',
	'lugWitdh',
  'sizeLength',
  'thickness',
	'movementManufacturer',
	'winding',
	'warranty',
	'Purchase Link',
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;

  dataSource: any;
  displayedColumns = tableHeaders;
  columns = new BehaviorSubject<Array<string>>([]);

  constructor(
    private analytics: AnalyticsService,
    private csv: CsvService) { }

  openLink(element:any): void {
    this.analytics.eventEmitter(`open_url_${element.link.readable}`, 'Link-clicked', 'click', `${element.link.readable}`);
    window.open(element.link.url);
  }

  updateColumns(columns: Array<string>) {
    this.columns.next(columns);
  }


  searchTable(input: string) {
    this.dataSource.filter = input.toLocaleLowerCase().trim();
  }

  ngAfterViewInit() {
    this.csv.getSheet().subscribe(
      response => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
      }
    )
  }

}
