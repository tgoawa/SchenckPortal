import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingAdminComponent } from './marketingAdmin.component';

describe('MarketingAdminComponent', () => {
  let component: MarketingAdminComponent;
  let fixture: ComponentFixture<MarketingAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketingAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
