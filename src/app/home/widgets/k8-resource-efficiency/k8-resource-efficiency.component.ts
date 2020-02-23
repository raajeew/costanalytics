import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Color, Label } from 'ng2-charts';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-k8-resource-efficiency',
  templateUrl: './k8-resource-efficiency.component.html',
  styleUrls: ['./k8-resource-efficiency.component.css']
})
export class K8ResourceEfficiencyComponent implements OnInit {
  public showLoading = false;
  // Chart variable
  public chartColors: Color[] = [
    { backgroundColor: '#D31F6B' },
    { backgroundColor: '#2DB3E0' },
    { backgroundColor: '#FF990D' },    
    { backgroundColor: '#FFD00A' },
    { backgroundColor: '#18C38A' },
    { backgroundColor: '#1F78B4' }
  ];
  private graphConfig : ChartOptions = {
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
          stacked: true,
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            display: false
          }
        }
      ],
      yAxes: [{
        stacked: true,
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
  public chartOptions: ChartOptions = {};
  
  public chartLabels: Label[] = [];
  public chartLegend = true;
  public chartType = 'bar';
  public chartPlugins = [];
  public chartData: ChartDataSets[] = null;

  constructor(private router:Router, private ds: DataService) { }

  ngOnInit() {
    this.getResourceEfficiency();
  }

  navigate(page:any) {
    this.router.navigate([page]);
  }

  getResourceEfficiency() {
    this.showLoading = true;
    this.ds.getMockData('/efficiency/resource').subscribe(
      (result: any) => {
        this.showLoading = false;
        this.chartData = result.dataset;
        this.chartLabels = result.label;
        this.chartOptions = this.graphConfig;
      },
      (error) => {},
      () => {
        this.showLoading = false;
      }
    );
  }
}
