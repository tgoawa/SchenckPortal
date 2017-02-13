/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClientTierListService } from './client-tier-list.service';

describe('ClientTierListServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientTierListService]
    });
  });

  it('should ...', inject([ClientTierListService], (service: ClientTierListService) => {
    expect(service).toBeTruthy();
  }));
});
