import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleChartComponent } from 'angular-google-charts';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-costby-treemap',
  templateUrl: './costby-treemap.component.html',
  styleUrls: ['./costby-treemap.component.css']
})
export class CostbyTreemapComponent implements OnInit {

  constructor(private router: Router, private ds: DataService) { }
  public showLoading = false;
  title = '';
  type = 'TreeMap';
  data: any = [];
  columnNames = ['Provider', 'Parent', 'Cost', 'variation'];
  options: any = {};
  @ViewChild('treeMapChart', { static: true })
  treeMapChart: GoogleChartComponent;
  dataTable: any;
  public filters = ['Lease Type', 'Platform'];
  private currentFilter = this.filters[0];
  private cachedData;
  ngOnInit() {
    // temp deta
    this.getCost();
  }

  navigate(page: any) {
    this.router.navigate([page]);
  }

  getFormatedArr(arr, parentKey, op) {
    let key;
    let node;
    return arr.forEach((item, index) => {
      key = parentKey + index;
      node = [{ v: key, f: item.title +' $'+ item.cost }, parentKey, item.cost, item.variation || 0];
      op.push(node);
      if (item.data.length > 0) {
        this.getFormatedArr(item.data, key, op);
      }
    });
  }


  loadTreeMap(obj: any) {
    this.data = obj;
    this.options = {
      highlightOnMouseOver: false,
      maxDepth: 1,
      maxPostDepth: 2,
      minHighlightColor: '#8c6bb1',
      midHighlightColor: '#9ebcda',
      maxHighlightColor: '#edf8fb',
      minColor: '#009688',
      midColor: '#00b62f',
      maxColor: '#b60000',
      fontSize:'14',
      textStyle:{bold:true, color:'#FFFFFF', wrap:true},
      headerHeight: 0,
      showScale: false,
      height: 250,
      useWeightedAverageForAggregation: true,
      generateTooltip: this.showStaticTooltip
    };
  }
  showStaticTooltip = (row, size, value) => {
    const data = this.treeMapChart.wrapper.getDataTable();
    return '<div class="customToolTip">' +
      '<span><b>' + data.getFormattedValue(row, 0) + '</b> </div>';
  }

  // treemap back button
  backButton:boolean = false;
  selectEvent(event){
    this.backButton = true;
  }
  treeMapBack() {
    this.backButton = false;
    const wrapper = this.treeMapChart.wrapper;
    wrapper.draw();
  }

  loadGraph() {
    const nodes = this.cachedData.data.find(item => item.groupby === this.currentFilter).data;
    const data = [[{ v: '0', f: 'Global' }, null, 0, 0]];
    this.getFormatedArr(nodes, '0', data);
    this.loadTreeMap(data || []);
  }

  getCost() {
    this.showLoading = true;
    this.ds.getMockData('/cost').subscribe(
      (result: any) => {
        this.cachedData = result;
        this.loadGraph();
        this.showLoading = false;
      },
      (error) => { },
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
