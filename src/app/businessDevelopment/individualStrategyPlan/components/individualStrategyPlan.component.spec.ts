import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualStrategyPlanComponent } from './individualStrategyPlan.component';

describe('IndividualStrategyPlanComponent', () => {
  let component: IndividualStrategyPlanComponent;
  let fixture: ComponentFixture<IndividualStrategyPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualStrategyPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualStrategyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
