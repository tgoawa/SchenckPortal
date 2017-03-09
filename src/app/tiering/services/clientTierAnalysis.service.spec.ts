/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClientTierAnalysisService } from './clientTierAnalysis.service';

describe('ClientTierAnalysisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientTierAnalysisService]
    });
  });

  it('should ...', inject([ClientTierAnalysisService], (service: ClientTierAnalysisService) => {
    expect(service).toBeTruthy();
  }));
});
