import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { K8ClusterCostEfficiencyComponent } from './k8-cluster-cost-efficiency.component';

describe('K8ClusterCostEfficiencyComponent', () => {
  let component: K8ClusterCostEfficiencyComponent;
  let fixture: ComponentFixture<K8ClusterCostEfficiencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ K8ClusterCostEfficiencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(K8ClusterCostEfficiencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
