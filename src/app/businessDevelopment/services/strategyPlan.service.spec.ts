import { TestBed, inject } from '@angular/core/testing';

import { StrategyPlanService } from './strategyPlan.service';

describe('StrategyPlanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StrategyPlanService]
    });
  });

  it('should ...', inject([StrategyPlanService], (service: StrategyPlanService) => {
    expect(service).toBeTruthy();
  }));
});
