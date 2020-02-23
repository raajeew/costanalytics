import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostbyTreemapComponent } from './costby-treemap.component';

describe('CostbyTreemapComponent', () => {
  let component: CostbyTreemapComponent;
  let fixture: ComponentFixture<CostbyTreemapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostbyTreemapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostbyTreemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
