import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutreachInterestsComponent } from './outreachAndInterests.component';

describe('OutreachInterestsComponent', () => {
  let component: OutreachInterestsComponent;
  let fixture: ComponentFixture<OutreachInterestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutreachInterestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutreachInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
