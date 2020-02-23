import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import { GoogleChartsModule } from 'angular-google-charts';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import { ChartsModule } from 'ng2-charts';

import { PotentialSavingsComponent } from './widgets/potential-savings/potential-savings.component';
import { InsightsComponent } from './widgets/insights/insights.component';
import { CostbyPieComponent } from './widgets/costby-pie/costby-pie.component';
import { CostbyTreemapComponent } from './widgets/costby-treemap/costby-treemap.component';
import { CostVariationsComponent } from './widgets/cost-variations/cost-variations.component';
import { K8ResourceEfficiencyComponent } from './widgets/k8-resource-efficiency/k8-resource-efficiency.component';
import { K8ClusterCostEfficiencyComponent } from './widgets/k8-cluster-cost-efficiency/k8-cluster-cost-efficiency.component';
import { BudgetPlanningComponent } from './widgets/budget-planning/budget-planning.component';
import { CostComparisonComponent } from './widgets/cost-comparison/cost-comparison.component';
import { MatSortModule } from '@angular/material/sort';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CostVariationDetailsComponent } from './widgets/cost-variations/cost-variation-details/cost-variation-details.component';

@NgModule({
  declarations: [
    HomeComponent,
    PotentialSavingsComponent,
    InsightsComponent,
    CostbyPieComponent,
    CostbyTreemapComponent,
    CostVariationsComponent,
    K8ResourceEfficiencyComponent,
    K8ClusterCostEfficiencyComponent,
    BudgetPlanningComponent,
    CostComparisonComponent,
    CostVariationDetailsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    // Ng2GoogleChartsModule,
    MatTableModule,
    MatSortModule,
    MatProgressBarModule,
    ChartsModule,
    GoogleChartsModule.forRoot()
  ],
  entryComponents: [PotentialSavingsComponent,
    InsightsComponent,
    CostbyPieComponent,
    CostbyTreemapComponent,
    CostVariationsComponent,
    K8ResourceEfficiencyComponent,
    K8ClusterCostEfficiencyComponent,
    BudgetPlanningComponent,
    CostComparisonComponent]
})
export class HomeModule { }
