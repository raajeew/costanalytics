import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Color, Label } from 'ng2-charts';
import { ChartOptions, ChartDataSets } from 'chart.js';

export interface CostVariationRow {
  expandedElement:any;
  title: string;
  cost: number;
  lastMonthCost: number;
  budgetedCost: number;
  variation: number;
}
@Component({
  selector: 'app-cost-variations',
  templateUrl: './cost-variations.component.html',
  styleUrls: ['./cost-variations.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CostVariationsComponent implements OnInit {
  public showLoading = false;
  public expandedElement;
  dataSource = new MatTableDataSource([]);
  columnsToDisplay = ['title', 'cost'];
  private currentFilter = 'Services';
  public filters = [];
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private router: Router, private ds: DataService) { }

  ngOnInit() {
    this.getCostVariation();
  }

  filterCard(value) {
    this.currentFilter = value;
  }

  animStart(event) {
    // console.log('Animation Started');
    // // do more stuff
    // console.log('event.fromState', event.fromState);
    // console.log('event.phaseName', event.phaseName);
    // console.log('event.toState', event.toState);
    // console.log('event.totalTime', event.totalTime);
  }

  animEnd(event) {
    // console.log('Animation Ended');
    // // do more stuff
    // console.log('event.fromState', event.fromState);
    // console.log('event.phaseName', event.phaseName);
    // console.log('event.toState', event.toState);
    // console.log('event.totalTime', event.totalTime);
  }

  navigate(page: any) {
    this.router.navigate([page]);
  }

  getCostVariation() {
    this.showLoading = true;
    this.ds.getMockData('/cost/variation').subscribe(
      (result: any) => {
        this.dataSource = new MatTableDataSource(result.data);
        this.dataSource.sort = this.sort;
      },
      (error) => {},
      () => {
        this.showLoading = false;
      }
    );
  }
}
