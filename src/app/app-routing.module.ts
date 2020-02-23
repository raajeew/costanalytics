import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'k8-cluster', loadChildren: () => import('./k8-cluster/k8-cluster.module').then(m => m.K8ClusterModule) },
  { path: 'provider', loadChildren: () => import('./k8-cluster/k8-cluster.module').then(m => m.K8ClusterModule) },
  { path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
  { path: 'optimize', loadChildren: () => import('./optimize/optimize.module').then(m => m.OptimizeModule) },
  { path: 'budget', loadChildren: () => import('./budget/budget.module').then(m => m.BudgetModule) },
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: '**', loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
