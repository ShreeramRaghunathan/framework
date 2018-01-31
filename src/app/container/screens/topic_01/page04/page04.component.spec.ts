import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Page04Component } from './page04.component';

describe('Page04Component', () => {
  let component: Page04Component;
  let fixture: ComponentFixture<Page04Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page04Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
