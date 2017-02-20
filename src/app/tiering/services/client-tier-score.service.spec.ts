/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClientTierScoreService } from './client-tier-score.service';

describe('ClientTierScoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientTierScoreService]
    });
  });

  it('should ...', inject([ClientTierScoreService], (service: ClientTierScoreService) => {
    expect(service).toBeTruthy();
  }));
});
