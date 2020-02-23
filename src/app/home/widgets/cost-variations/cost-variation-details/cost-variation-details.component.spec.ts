import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostVariationDetailsComponent } from './cost-variation-details.component';

describe('CostVariationDetailsComponent', () => {
  let component: CostVariationDetailsComponent;
  let fixture: ComponentFixture<CostVariationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostVariationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostVariationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
