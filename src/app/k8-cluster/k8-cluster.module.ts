import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { MomentModule } from 'ngx-moment';
import { K8ClusterRoutingModule } from './k8-cluster-routing.module';
import { K8ClusterComponent } from './k8-cluster.component';
import { ChartsModule } from 'ng2-charts';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [K8ClusterComponent],
  imports: [
    CommonModule,
    K8ClusterRoutingModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule, ReactiveFormsModule,
    MatAutocompleteModule,
    NgxDaterangepickerMd.forRoot(),
    MomentModule,
    ChartsModule,
    MatTableModule,
    MatSortModule
  ]
})
export class K8ClusterModule { }
