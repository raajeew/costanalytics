import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements OnInit {

  constructor(private router:Router,private ds: DataService) { }

  ngOnInit() {
    this.getCost();
  }

  navigate(page:any) {
    this.router.navigate([page]);
  }
  //http://localhost:4200/mcapi/insites
  showLoading:Boolean=false;
  insightsData:any=[];
  getCost() {
    this.showLoading = true;
    this.ds.getMockData('/insites').subscribe(
      (result: any) => {
        this.insightsData = result;
        this.showLoading=false;
      },
      (error) => {},
      () => {
        this.showLoading = false;
      }
    );
  }
}
