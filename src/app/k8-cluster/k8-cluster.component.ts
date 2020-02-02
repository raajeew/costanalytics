import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { DaterangepickerDirective,DaterangepickerComponent } from 'ngx-daterangepicker-material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as moment from 'moment';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label,Color } from 'ng2-charts';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import * as $ from 'jquery';
@Component({
  selector: 'app-k8-cluster',
  templateUrl: './k8-cluster.component.html',
  styleUrls: ['./k8-cluster.component.css']
})
export class K8ClusterComponent implements OnInit {
 // @ViewChild(DaterangepickerDirective) pickerDirective: DaterangepickerDirective;
  picker: DaterangepickerComponent;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  chartType:ChartType = 'bar';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  
  //filter master list
  filterMasterData:any={
    account:['ac1','ac2'],
    deployment:['dep1','dep2'],
    daemonset:['daemon1','daemon2'],
    environment:['env1','env2'],
    product:['prod1','prod2'],
    pod:['pod1','pod2'],
    region:['reg1','reg2']
  }
  filterPayload:any={};
  filterCtrl = new FormControl();
  filteredFilter: Observable<string[]>;
  currentFilters: string[] = [];
  allFilters: string[] = [];
  
  @ViewChild('filterInput', {static: false}) filterInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  @ViewChild('automcompleteTrigger',{static: false}) automcompleteTrigger;
  
  
  constructor() {
       this.allFilters=Object.keys(this.filterMasterData);
       this.setFilterData();
    }

  setFilterData(){
    this.filteredFilter = this.filterCtrl.valueChanges.pipe(
      startWith(null),
      map((filter: string | null) => filter ? this._filter(filter) : this.allFilters.slice()));
  }  

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = ['clusterId', 'memCost', 'cpuCost', 'networkCost', 'storageCost', 'gpuCost', 'otherCost', 'totalCost', 'possibleSavings' ];
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  ngOnInit(){
    this.dataSource.sort = this.sort;
    this.loadChart('bar',true);
  }
  add(event: MatChipInputEvent): void {
    // Add filter only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our filter
      if ((value || '').trim()) {
        this.currentFilters.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }      
      this.filterCtrl.setValue(null);
    }
  }

  remove(filter: string): void {
    const index = this.currentFilters.indexOf(filter);
    console.log(this.currentFilters);
    if (index >= 0) {
      this.currentFilters.splice(index, 1);
    }
  }

  curKey:any="";
  selected(event: MatAutocompleteSelectedEvent): void {
    let selectedKey="";
    if(this.curKey){
      this.currentFilters.push(event.option.viewValue);
      if(this.filterPayload.hasOwnProperty(this.curKey.split(':')[0])){
        this.filterPayload[this.curKey.split(':')[0]].push(event.option.viewValue);
        this.filterPayload[this.curKey.split(':')[0]] = Array.from(new Set(this.filterPayload[this.curKey.split(':')[0]]));
      }
      console.log(this.filterPayload);
      this.curKey=''; 
      $(".mat-form-field-label").removeClass("filterhasvalue"); 
      this.filterInput.nativeElement.value = '';
      this.filterCtrl.setValue(null);
      this.allFilters=Object.keys(this.filterMasterData);      
      this.setFilterData();
    }else{
      selectedKey=event.option.viewValue;   
      if(!this.filterPayload.hasOwnProperty(selectedKey)){
        this.filterPayload[selectedKey] = []; 
      }
      $(".mat-form-field-label").addClass("filterhasvalue"); 
     // labelEl.classList.add("rajeev"); 
      this.curKey = event.option.viewValue +':';
      this.filterInput.nativeElement.value = '';
      this.filterCtrl.setValue(null);
      this.allFilters= this.filterMasterData[selectedKey];
      this.setFilterData();
      setTimeout(()=> {this.automcompleteTrigger.openPanel() })
    }
    
  }

  private _filter(value: string): string[] {
   // const filterValue = value.toLowerCase();
   const filterValue = value;

    return this.allFilters.filter(filter => filter.toLowerCase().indexOf(filterValue) === 0);
  }

  selectedDate: any={start: moment().subtract(29, 'days'), end: moment()};
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  open(e) {
    //this.pickerDirective.open(e);
    document.getElementById("calendarinput").click();
  }
  public barChartColors: Color[] = [
    { backgroundColor: '#2DB3E0' },
    { backgroundColor: '#FF990D' },
    { backgroundColor: '#D31F6B' },
    { backgroundColor: '#FFD00A' },
    { backgroundColor: '#18C38A' },
    { backgroundColor: '#1F78B4' }
  ]
  public barChartOptions: ChartOptions = {};
  public barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug','Sep','Oct','Nov','Dec'];
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40], label: 'Namespace 1' },
    { data: [28, 48, 40, 19, 86, 27, 90, 40, 19, 86, 27, 90], label: 'Namespace 2' },
    { data: [10, 38, 20, 9, 96, 37, 60, 80, 19, 86, 87, 20], label: 'Namespace 3' },
    { data: [58, 48, 60, 19, 86, 27, 90, 70, 59, 66, 27, 60], label: 'Namespace 4' },
    { data: [28, 48, 40, 19, 86, 27, 90, 40, 19, 86, 27, 90], label: 'Namespace 5' },
    { data: [10, 38, 20, 9, 96, 37, 60, 80, 19, 86, 87, 20], label: 'Others' }
  ];
  
  loadChart(type, isStacked){
    //$(".chartTypeWrap > span").removeClass('chartActive');
    $('.ctype').click(function() {
      $('.ctype').removeClass('chartActive')
      $(this).addClass('chartActive')
    });
    this.chartType = type;
    this.barChartOptions={
      title: {
        display: false,
        position: 'bottom',
        text: 'Chart.js Bar Chart - Stacked'
      },
      legend:{
        position: 'bottom',
        labels:{
          boxWidth:12
        }
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      responsive: true,
      maintainAspectRatio:false,
      scales: {
        xAxes: [{
          stacked: isStacked,
          ticks: {
            beginAtZero:true
          },
          gridLines : {
            display : false
          }
        }],
        yAxes: [{
          stacked: isStacked,
          gridLines: {
            drawBorder: false,
          },
          scaleLabel: {
            display: true,
            labelString: 'Cost'
          }
        }]
      }
    };
  }

  //table gribd
  

}

export interface PeriodicElement {
  clusterId:string;
  memCost:number;
  cpuCost:number;
  networkCost:number;
  storageCost:number;
  gpuCost:number;
  otherCost:number;
  totalCost:number;
  possibleSavings:number;
  trend:number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {clusterId: "Namespace 1", memCost: 889,cpuCost:123, networkCost:134, storageCost:234, gpuCost:1123, otherCost:213, totalCost:1321, possibleSavings:10263, trend:48},
  {clusterId: "Namespace 2", memCost: 1069,cpuCost:123, networkCost:134, storageCost:234, gpuCost:1123, otherCost:213, totalCost:1321, possibleSavings:3126, trend:7},
  {clusterId: "Namespace 3", memCost: 1005,cpuCost:123, networkCost:134, storageCost:234, gpuCost:1123, otherCost:213, totalCost:1321, possibleSavings:3126, trend:7},
  {clusterId: "Namespace 4", memCost: 589,cpuCost:123, networkCost:134, storageCost:234, gpuCost:1123, otherCost:213, totalCost:1321, possibleSavings:3126, trend:7},
  {clusterId: "Namespace 5", memCost: 1489,cpuCost:123, networkCost:134, storageCost:234, gpuCost:1123, otherCost:213, totalCost:1321, possibleSavings:3126, trend:7},
  {clusterId: "Namespace 6", memCost: 1389,cpuCost:123, networkCost:134, storageCost:234, gpuCost:1123, otherCost:213, totalCost:1321, possibleSavings:3126, trend:7}
];