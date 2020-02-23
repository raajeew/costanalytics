import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget-planning',
  templateUrl: './budget-planning.component.html',
  styleUrls: ['./budget-planning.component.css']
})
export class BudgetPlanningComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  navigate(page:any) {
    this.router.navigate([page]);
  }

}
