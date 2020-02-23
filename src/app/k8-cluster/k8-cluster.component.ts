import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as moment from 'moment';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../data.service';
import { DataGrid, DataGridColumn } from './models/data-grid';
import { GroupTab, Priority2 } from './models/group-tab';
import { Snapshot } from './models/snapshot';
import * as $ from 'jquery';
import { UtilitiesService } from '../common/utilities.service';

@Component({
  selector: 'app-k8-cluster',
  templateUrl: './k8-cluster.component.html',
  styleUrls: ['./k8-cluster.component.css']
})
export class K8ClusterComponent implements OnInit {
  // @ViewChild(DaterangepickerDirective) pickerDirective: DaterangepickerDirective;
  showLoading = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  chartType: ChartType = 'bar';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filterPayload: any = {};
  filterCtrl = new FormControl();
  filteredFilter: Observable<string[]>;
  currentFilters: string[] = [];
  allFilters: string[] = [];

  // default settings
  private payload = {
    primaryGroup: 'provider',
    duration: {
      start: 1581379200,
      end: 1581465600
    },
    filter: [],
    subGroup: ['provider'],
    metric: ['totalcost'],
    granularity: 'hourly'
  };

  // filter master list
  filterMasterData: any = {};
  curKey: any = '';

  // calendar variables
  selectedDate: any = { start: moment().startOf('month'), end: moment().endOf('month') };
  ranges: any = {
    '1D': [moment(), moment()],
    '7D': [moment().subtract(6, 'days'), moment()],
    'Current Month': [moment().startOf('month'), moment().endOf('month')],
    'Last 3Months': [moment().subtract(3, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'Last 6Months': [moment().subtract(6, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'Last 1 Year': [moment().subtract(12, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'Month to date': [moment().startOf('month'), moment()],
    'Year to date': [moment().startOf('year'), moment()]
  };

  // chart variables
  public barChartColors: Color[] = [
    { backgroundColor: '#2DB3E0' },
    { backgroundColor: '#FF990D' },
    { backgroundColor: '#D31F6B' },
    { backgroundColor: '#FFD00A' },
    { backgroundColor: '#18C38A' },
    { backgroundColor: '#1F78B4' }
  ];
  public barChartOptions: ChartOptions = {};
  public barChartLabels: Label[] = [];
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = null;
  // snap shots
  snapShots: Snapshot;

  // group tabs
  groupTabs: GroupTab = { priority1: [], priority2: [], priority3: [] };
  public selectedGroupTab = 'provider';

  // graph
  graphData: any;

  // datagrid
  dataSource = new MatTableDataSource([]);
  columns: DataGridColumn[] = [];
  displayedColumns: string[] = [];

  @ViewChild('filterInput', { static: false }) filterInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  @ViewChild('automcompleteTrigger', { static: false }) automcompleteTrigger;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private ds: DataService, private utilityService: UtilitiesService) {
     // CONSTRUCTOR METHODS
  }


  setFilterData() {
    this.filteredFilter = this.filterCtrl.valueChanges.pipe(
      startWith(null),
      map((filter: string | null) =>
        filter ? this._filter(filter) : this.allFilters.slice()
      )
    );
  }

  private fetchFilterData() {
    this.showLoading = true;
    this.ds.getMockData('/filters').subscribe(
      (result: any) => {
        this.showLoading = false;
        result.forEach((item: any) => {
          this.filterMasterData[item.key] = item.values;
        });
        this.allFilters = Object.keys(this.filterMasterData);
        this.setFilterData();
      },
      (error) => {
        this.showLoading = false;
      }
    );
  }

  private fetchSnapshotData() {
    this.showLoading = true;
    this.ds.getMockData('/snapshot').subscribe(
      (result: Snapshot) => {
        this.showLoading = false;
        this.snapShots = result;
      },
      (error) => {
        this.showLoading = false;
      }
    );
  }

  private fetchGroupTabData() {
    this.ds.getMockData('/grouptab').subscribe(
      (result: GroupTab) => {
        this.groupTabs = result;
      },
      (error) => {
        this.showLoading = false;
      }
    );
  }

  private fetchGraphData() {
    this.showLoading = true;
    this.ds.getMockData('/graph').subscribe(
      (result: any) => {
        this.showLoading = false;
        this.graphData = result;
        this.barChartData = result.dataset;
        this.barChartLabels = result.label;
      },
      (error) => {
        this.showLoading = false;
      }
    );
  }

  private fetchDataGridData() {
    this.ds.getMockData('/datagrid').subscribe(
      (result: DataGrid) => {
        this.dataSource = new MatTableDataSource(result.rows);
        this.columns = result.columns;
        this.displayedColumns = result.columns.map(c => c.key);
        this.dataSource.sort = this.sort;
      },
      (error) => {
        this.showLoading = false;
      }
    );
  }

  ngOnInit() {
    // openSnackbar
    // this.utilityService.openSnackBar('Session timed out', '', 'error');
    // open snackbar ends
    this.loadChart('bar', true);
    $('.groupItems > li').click(function() {
      $('.groupItems > li').removeClass('active');
      $(this).addClass('active');
    });
    $('.fit2screen').click(() => {
      $('#chartwrap').toggle();
    });



    this.fetchFilterData();
    // fetch group tabs
    this.fetchSnapshotData();

    // fetch group tabs
    this.fetchGroupTabData();

    // fetch graph data
    this.fetchGraphData();

    // fetch datagrid data
    this.fetchDataGridData();
  }
  onDateRangeChanged(event) {
    // console.log(this.utilityService.prepareFilterPayload(this.filterPayload));
    if (event.start && event.end) {
      this.payload.duration.start = event.start.unix();
      this.payload.duration.end = event.end.unix();
      // this.fetchGroupTabData();
      this.fetchGraphData();
      this.fetchDataGridData();
    }
  }
  onTabSelected(tab) {
    this.selectedGroupTab = tab.key;
    this.payload.subGroup = [tab.key];
    this.fetchGraphData();
    this.fetchDataGridData();
  }
  onSecondaryTabSelected(tab) {
    this.groupTabs.priority1.push(tab);
    this.groupTabs.priority2 = this.groupTabs.priority2.filter(ele => ele.key !== tab.key);
    this.onTabSelected(tab);
  }
  onGranularityChanged(event) {
    this.payload.granularity = event.target.value;
    this.fetchGraphData();
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

  filterChange(event) {
    console.log('filterChange1', event);
  }

  remove(filter: string): void {
    const index = this.currentFilters.indexOf(filter);
    if (index >= 0) {
      this.currentFilters.splice(index, 1);
    }
    const allFilters = Object.keys(this.filterPayload);
    allFilters.forEach((item) => {
      this.filterPayload[item] = this.arrayRemove(
        this.filterPayload[item],
        filter
      );
      if (this.filterPayload[item].length < 1) {
        delete this.filterPayload[item];
      }
    });
    // Update filter payload and refresh graph
    this.payload.filter = this.utilityService.prepareFilterPayload(this.filterPayload);
    this.fetchGraphData();
    this.fetchDataGridData();
  }

  arrayRemove(arr, value) {
    return arr.filter((ele) => {
      return ele !== value;
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let selectedKey = '';
    if (this.curKey) {
      this.currentFilters.push(event.option.viewValue);
      this.currentFilters = Array.from(new Set(this.currentFilters));
      if (this.filterPayload.hasOwnProperty(this.curKey.split(':')[0])) {
        this.filterPayload[this.curKey.split(':')[0]].push(
          event.option.viewValue
        );
        this.filterPayload[this.curKey.split(':')[0]] = Array.from(
          new Set(this.filterPayload[this.curKey.split(':')[0]])
        );
        //
        console.log(this.curKey.split(':')[0]);
      }
      console.log('filterPayload', this.filterPayload);
      this.payload.filter = this.utilityService.prepareFilterPayload(this.filterPayload);
      this.fetchGraphData();
      this.fetchDataGridData();
      this.curKey = '';
      $('.mat-form-field-label').removeClass('filterhasvalue');
      this.filterInput.nativeElement.value = '';
      this.filterCtrl.setValue(null);
      this.allFilters = Object.keys(this.filterMasterData);
      this.setFilterData();
    } else {
      selectedKey = event.option.viewValue;
      if (!this.filterPayload.hasOwnProperty(selectedKey)) {
        this.filterPayload[selectedKey] = [];
      }
      $('.mat-form-field-label').addClass('filterhasvalue');
      // labelEl.classList.add("rajeev");
      this.curKey = event.option.viewValue + ':';
      this.filterInput.nativeElement.value = '';
      this.filterCtrl.setValue(null);
      this.allFilters = this.filterMasterData[selectedKey];
      this.setFilterData();
      setTimeout(() => {
        this.automcompleteTrigger.openPanel();
      });
    }
  }

  private _filter(value: string): string[] {
    let filterValue: any;
    if (typeof(value) === 'string') {
       filterValue = value.toLowerCase();
    } else {
      filterValue = value;
    }

    return this.allFilters.filter(filter => filter.toLowerCase().indexOf(filterValue) === 0);
  }
  isInvalidDate(date) {
    return date.weekday() === 0;
  }

  open(e) {
    // this.pickerDirective.open(e);
    document.getElementById('calendarinput').click();
  }

  loadChart(type, isStacked) {
    $('.ctype').click(function() {
      $('.ctype').removeClass('chartActive');
      $(this).addClass('chartActive');
    });
    if (type === 'line') {
      // this.barChartColors = [];
    }
    this.chartType = type;
    this.barChartOptions = {
      title: {
        display: false,
        position: 'bottom',
        text: ''
      },
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12
        }
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            stacked: isStacked,
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: false
            }
          }
        ],
        yAxes: [{
          stacked: isStacked,
          ticks: {
              callback(label, index, labels) {
                if (label > 0) {
                  return '$' + label / 1000 + 'K';
                } else {
                  return label;
                }
            }
          },
          gridLines: {
            drawBorder: false,
          },
          scaleLabel: {
            display: true,
            labelString: 'Costs'
          }
        }]
      }
    };
  }
}
