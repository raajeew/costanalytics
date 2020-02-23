import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialSavingsComponent } from './potential-savings.component';

describe('PotentialSavingsComponent', () => {
  let component: PotentialSavingsComponent;
  let fixture: ComponentFixture<PotentialSavingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotentialSavingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentialSavingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
