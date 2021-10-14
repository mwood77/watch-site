import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CsvService } from 'src/utils/csv.service';

import { AnalyticsService } from '../../utils/analytics.service';

const tableHeaders: Array<string> = [
	'Manufacturer',
	'Model',
	'Width',
	'Lug Width',
  'Thickness',
	'Movement',
	'Winding Action',
	'Warranty',
	'Purchase Link',
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  dataSource$: Observable<any>;
  displayedColumns = tableHeaders;
  columns = new BehaviorSubject<Array<string>>([]);

  constructor(
    private analytics: AnalyticsService,
    private csv: CsvService) { }

  ngOnInit(): void {
    this.csv.getSheet().subscribe(
      response => {
        this.dataSource$ = response;
      }
    )
  }

  openLink(element:any): void {
    this.analytics.eventEmitter(`open_url_${element.link.readable}`, 'Link-clicked', 'click', `${element.link.readable}`);
    window.open(element.link.url);
  }

  updateColumns(columns: Array<string>) {
    this.columns.next(columns);
  }

  /**
   * @todo
   * - add search filter functionality for table
   * - add sorting functionality for table
   */

}
