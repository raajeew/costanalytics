import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { K8ClusterComponent } from './k8-cluster.component';

describe('K8ClusterComponent', () => {
  let component: K8ClusterComponent;
  let fixture: ComponentFixture<K8ClusterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ K8ClusterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(K8ClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
