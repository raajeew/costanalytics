import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { K8ClusterComponent } from './k8-cluster.component';

const routes: Routes = [{ path: '', component: K8ClusterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class K8ClusterRoutingModule { }
