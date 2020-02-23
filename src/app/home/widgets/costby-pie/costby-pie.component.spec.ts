import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostbyPieComponent } from './costby-pie.component';

describe('CostbyPieComponent', () => {
  let component: CostbyPieComponent;
  let fixture: ComponentFixture<CostbyPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostbyPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostbyPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
