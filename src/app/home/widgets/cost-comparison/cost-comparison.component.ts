import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { DataService } from '../../../data.service';
import { UtilitiesService } from '../../../common/utilities.service';
@Component({
  selector: 'app-cost-comparison',
  templateUrl: './cost-comparison.component.html',
  styleUrls: ['./cost-comparison.component.css']
})
export class CostComparisonComponent implements OnInit {
  showLoading = false;
  public chartOptions: ChartOptions = {};
  public chartData: ChartDataSets[] = null;
  public chartLabels: Label[] = [];
  public chartLegend = true;
  public snapshot:any = {};
  chartType: ChartType = 'line';
  public chartColors: Color[] = [
    { backgroundColor: 'rgba(67, 137, 219, 0.6)' }
  ];
  graphData: any;
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

  constructor(private router: Router,private ds: DataService, private utilityService: UtilitiesService) { }

  ngOnInit() {
    // fetch graph data
    this.fetchGraphData();
  }

  navigate(page:any) {
    this.router.navigate([page]);
  }
  private fetchGraphData() {
    this.showLoading = true;
    this.ds.getMockData('/cost/monthly').subscribe(
      (result: any) => {
        this.showLoading = false;
        this.snapshot = result.snapshot;
        this.graphData = result.graph;
        this.chartData = result.graph.dataset;
        this.chartLabels = result.graph.label;
        this.loadChart();
      },
      (error) => {
        this.showLoading = false;
      }
    );
  }

  loadChart() {
    this.chartOptions = {
      title: {
        display: false,
        position: 'bottom',
        text: ''
      },
      legend: {
        position: 'bottom',
        display:false,
        labels: {
          boxWidth: 12,
          
        }
      },
      tooltips: {
        mode: 'index',
        intersect: true,
        callbacks: {
          label: function(tooltipItems, data) { 
              return '$'+tooltipItems.yLabel;
          }
      }
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            stacked: false,
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: false
            }
          }
        ],
        yAxes: [{
          stacked: false,
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
            display: false,
            labelString: 'Costs'
          }
        }]
      }
    };
  }
}
