import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DataService } from 'src/app/data.service';
@Component({
  selector: 'app-costby-pie',
  templateUrl: './costby-pie.component.html',
  styleUrls: ['./costby-pie.component.css']
})
export class CostbyPieComponent implements OnInit {

  title: any = '';
  type: any = 'PieChart';
  chartData: any = [];
  columnNames = ['', 'Current Cost'];
  options: any = {};
  displayedColumns = ['title', 'cost'];
  totalCost: any = 0;
  sliceColors:any=[{color: '#F49D17'}, {color: '#2DB3E0'}, {color: '#D31F6B'}, {color: '#039730'}, {color: '#570397'}];
  dataSource = new MatTableDataSource([]);

  public filters = ['provider', 'BU'];
  private currentFilter = this.filters[0];
  private cachedData;

  constructor(private router: Router, private ds: DataService) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  showLoading: any = false;

  ngOnInit() {
    this.getCost();
  }



  navigate(page: any) {
    this.router.navigate([page]);
  }

  loadDoughnutChart() {
    this.options = {
      pieHole: 0.85,
      pieSliceText: 'none',
      legend: 'none',
      slices: this.sliceColors,
      chartArea: { left: 0, top: 10, width: '200px', height: '90%' },
      tooltip: {},
      generateTooltip: this.showStaticTooltip
    };
  }

  showStaticTooltip = () => {

    return '<div class="customToolTip">tooltip </div>';
  }

  loadGraph() {
    const nodes = this.cachedData.data.find(item => item.groupby === this.currentFilter).data;
    let tempCost: any = 0;
    this.chartData = [];
    nodes.map((item,index) => {
      nodes[index].color=this.sliceColors[index].color;
      const chartItem: any = [];
      chartItem.push(item.title);
      chartItem.push(item.cost);
      this.chartData.push(chartItem);
      tempCost += item.cost;
    });
    this.totalCost = tempCost;
    this.dataSource = new MatTableDataSource(nodes);
    this.dataSource.sort = this.sort;
    this.loadDoughnutChart();
    
  }

  getCost() {
    this.showLoading = true;
    this.ds.getMockData('/cost').subscribe(
      (result: any) => {
        this.cachedData = result;
        this.loadGraph();
        this.showLoading = false;
      },
      (error) => {
        this.showLoading = false;
      },
      () => {
        this.showLoading = false;
      }
    );
  }

  filterCard(value) {
    this.currentFilter = value;
    this.loadGraph();
  }

}

export interface CostItem {
  title: string;
  cost: number;
}
