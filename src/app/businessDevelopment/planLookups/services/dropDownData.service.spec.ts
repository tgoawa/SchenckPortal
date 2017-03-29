import { TestBed, inject } from '@angular/core/testing';

import { DropDownDataService } from './dropDownData.service';

describe('DropDownDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DropDownDataService]
    });
  });

  it('should ...', inject([DropDownDataService], (service: DropDownDataService) => {
    expect(service).toBeTruthy();
  }));
});
