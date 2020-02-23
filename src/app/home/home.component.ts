import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
//import card widgets
import { CostComparisonComponent } from './widgets/cost-comparison/cost-comparison.component';
import { CostVariationsComponent } from './widgets/cost-variations/cost-variations.component';
import { CostbyPieComponent } from './widgets/costby-pie/costby-pie.component';
import { CostbyTreemapComponent } from './widgets/costby-treemap/costby-treemap.component';
import { InsightsComponent } from './widgets/insights/insights.component';
import { K8ClusterCostEfficiencyComponent } from './widgets/k8-cluster-cost-efficiency/k8-cluster-cost-efficiency.component';
import { K8ResourceEfficiencyComponent } from './widgets/k8-resource-efficiency/k8-resource-efficiency.component';
import { PotentialSavingsComponent } from './widgets/potential-savings/potential-savings.component';
import { BudgetPlanningComponent } from './widgets/budget-planning/budget-planning.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showLoading:boolean=false;
  public availableWidgets:any = [
    {
      label: "Total Cost vs Forecasted Cost",
      component: CostComparisonComponent,
      class: "w50",
      active: true
    },
    {
      label: "Potential Savings",
      component: PotentialSavingsComponent,
      class: "w25",
      active: true
    },
    {
      label: "Insights",
      component: InsightsComponent,
      class: "w25",
      active: true
    },
    {
      label: "Cost By",
      component: CostbyPieComponent,
      class: "w50",
      active: true
    },
    {
      label: "Cost Variations",
      component: CostVariationsComponent,
      class: "w25",
      active: true
    },
    {
      label: "Cost By",
      component: CostbyTreemapComponent,
      class: "w25",
      active: true
    },
    {
      label: "Budget & Planning",
      component: BudgetPlanningComponent,
      class: "w50",
      active: true
    },
    {
      label: "K8s Resource Efficiency",
      component: K8ResourceEfficiencyComponent,
      class: "w25",
      active: true
    },
    {
      label: "K8s Cluster Cost Efficiency",
      component: K8ClusterCostEfficiencyComponent,
      class: "w25",
      active: true
    }
  ];
  constructor(private dataService : DataService,private router: Router) { }

  ngOnInit() {

  }
}
