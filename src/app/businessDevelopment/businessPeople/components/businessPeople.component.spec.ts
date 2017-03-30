import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPeopleComponent } from './businessPeople.component';

describe('BusinessPeopleComponent', () => {
  let component: BusinessPeopleComponent;
  let fixture: ComponentFixture<BusinessPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
