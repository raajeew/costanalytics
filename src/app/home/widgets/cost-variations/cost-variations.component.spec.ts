import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostVariationsComponent } from './cost-variations.component';

describe('CostVariationsComponent', () => {
  let component: CostVariationsComponent;
  let fixture: ComponentFixture<CostVariationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostVariationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostVariationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
