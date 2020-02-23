import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export interface CETableElement {
  name: string;
  efficiency: number;
}
@Component({
  selector: 'app-k8-cluster-cost-efficiency',
  templateUrl: './k8-cluster-cost-efficiency.component.html',
  styleUrls: ['./k8-cluster-cost-efficiency.component.css']
})
export class K8ClusterCostEfficiencyComponent implements OnInit {
  public data = new MatTableDataSource([]);
  public displayedColumns: string[] = ['name', 'efficiency'];
  public showLoading = false;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private router: Router, private ds: DataService) { }

  ngOnInit() {
    this.getCusterEfficiency();
  }

  navigate(page: any) {
    this.router.navigate([page]);
  }

  getCusterEfficiency() {
    this.showLoading = true;
    this.ds.getMockData('/efficiency/cluster').subscribe(
      (result: any) => {
        this.data = new MatTableDataSource(result);
        this.data.sort = this.sort;
        this.showLoading = false;
      },
      (error) => {
        this.showLoading = false;
      },
      () => {
        this.showLoading = false;
      }
    );
  }
}
