/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClientTierLookupsService } from './client-tier-lookups.service';

describe('ClientTierLookupsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientTierLookupsService]
    });
  });

  it('should ...', inject([ClientTierLookupsService], (service: ClientTierLookupsService) => {
    expect(service).toBeTruthy();
  }));
});
