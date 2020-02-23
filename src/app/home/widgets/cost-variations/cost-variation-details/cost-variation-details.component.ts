import { Component, OnInit, Input } from '@angular/core';
import { Color, Label } from 'ng2-charts';
import { ChartOptions, ChartDataSets } from 'chart.js';
import {draw} from 'patternomaly';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cost-variation-details',
  templateUrl: './cost-variation-details.component.html',
  styleUrls: ['./cost-variation-details.component.css']
})
export class CostVariationDetailsComponent implements OnInit {
  // Chart variables
  public chartColors: Color[] = [
    { backgroundColor: '#2DB3E0' },
    { backgroundColor: '#FF990D' },
    { backgroundColor: '#D31F6B' },
    { backgroundColor: '#FFD00A' },
    { backgroundColor: '#18C38A' },
    { backgroundColor: '#1F78B4' }
  ];
  private graphConfig: ChartOptions = {
    legend: { display: false },
    responsive:true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          stacked: true,
          gridLines: {
            display: false
          },
        }
      ],
      xAxes: [
        {
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
            display: false
          },
        }
      ]
    }
  };
  public chartOptions: ChartOptions = {};
  public chartLabels: Label[] = [];
  public chartLegend = true;
  public chartType = 'horizontalBar';
  public chartPlugins = [];
  public chartData: ChartDataSets[] = null;

  @Input() data: any;
  constructor(private router: Router) { }

  ngOnInit() {
    this.chartData = [
      {
        barThickness: 20,
        barPercentage: .4,
        categoryPercentage: 0.5,
        data: [this.data.cost, this.data.budgetedCost - this.data.cost],
        label: 'cost',
        backgroundColor: ['rgba(230,140,23,1)', 'rgba(20,107,210, 1)']
      },
      {
        barThickness: 20,
        barPercentage: .4,
        categoryPercentage: 0.5,
        data: [null, this.data.lastMonthCost],
        label: 'budget',
        backgroundColor: [null, draw('diagonal-right-left', 'rgba(20,107,210, .5)')]
      }
    ];
    this.chartLabels = ['Last Month', 'Current (MTD)'];
    this.chartOptions = this.graphConfig;
  }
  navigate(page: any) {
    this.router.navigate([page]);
  }

}
