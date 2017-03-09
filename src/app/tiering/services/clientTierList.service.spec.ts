/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClientTierListService } from './clientTierList.service';

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
