import { TestBed, inject } from '@angular/core/testing';

import { MarketingAdminService } from './marketingAdmin.service';

describe('MarketingAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarketingAdminService]
    });
  });

  it('should ...', inject([MarketingAdminService], (service: MarketingAdminService) => {
    expect(service).toBeTruthy();
  }));
});
