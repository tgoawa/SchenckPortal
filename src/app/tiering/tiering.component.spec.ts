/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TieringComponent } from './tiering.component';

describe('TieringComponent', () => {
  let component: TieringComponent;
  let fixture: ComponentFixture<TieringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TieringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TieringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
