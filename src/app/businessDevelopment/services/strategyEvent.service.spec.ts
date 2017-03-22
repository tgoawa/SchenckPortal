import { TestBed, inject } from '@angular/core/testing';

import { StrategyEventService } from './strategyEvent.service';

describe('StrategyEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StrategyEventService]
    });
  });

  it('should ...', inject([StrategyEventService], (service: StrategyEventService) => {
    expect(service).toBeTruthy();
  }));
});
