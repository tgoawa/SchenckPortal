import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyPlanComponent } from './strategyPlan.component';

describe('StrategyPlanComponent', () => {
  let component: StrategyPlanComponent;
  let fixture: ComponentFixture<StrategyPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrategyPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
