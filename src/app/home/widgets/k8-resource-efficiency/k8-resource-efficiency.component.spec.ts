import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { K8ResourceEfficiencyComponent } from './k8-resource-efficiency.component';

describe('K8ResourceEfficiencyComponent', () => {
  let component: K8ResourceEfficiencyComponent;
  let fixture: ComponentFixture<K8ResourceEfficiencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ K8ResourceEfficiencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(K8ResourceEfficiencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
