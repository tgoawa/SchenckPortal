import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorStrategyPlanComponent } from './mentor-strategy-plan.component';

describe('MentorStrategyPlanComponent', () => {
  let component: MentorStrategyPlanComponent;
  let fixture: ComponentFixture<MentorStrategyPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorStrategyPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorStrategyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
