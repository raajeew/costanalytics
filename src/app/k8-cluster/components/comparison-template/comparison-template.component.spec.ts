import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonTemplateComponent } from './comparison-template.component';

describe('ComparisonTemplateComponent', () => {
  let component: ComparisonTemplateComponent;
  let fixture: ComponentFixture<ComparisonTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparisonTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
