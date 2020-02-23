import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleChartComponent } from 'angular-google-charts';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-potential-savings',
  templateUrl: './potential-savings.component.html',
  styleUrls: ['./potential-savings.component.css']
})
export class PotentialSavingsComponent implements OnInit {

  constructor(private router: Router, private ds: DataService) { }
  public showLoading = false;
  title = '';
  type = 'TreeMap';
  data: any = [];
  columnNames = ['Provider', 'Parent', 'Cost'];
  options: any = {};
  @ViewChild('treeMapChart', { static: true })
  treeMapChart: GoogleChartComponent;
  dataTable: any;
  public filters = ['provider', 'BU'];
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
      node = [{ v: key, f: item.title +' $'+ item.cost}, parentKey, item.cost || 0];
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
      minColor: '#cc030c',
      midColor: '#00b62f',
      maxColor: '#03a7cc',
      fontColor:'#ffffff',
      fontSize:'14',
      headerHeight: 0,
      textStyle:{bold:true, color:'#FFFFFF', wrap:true},
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
    const data = [[{ v: '0', f: 'Global' }, null, 0]];
    this.getFormatedArr(nodes, '0', data);
    this.loadTreeMap(data || []);
  }

  getCost() {
    this.showLoading = true;
    this.ds.getMockData('/possible-savings').subscribe(
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

