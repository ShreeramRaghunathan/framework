import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Page01Component } from './page01.component';

describe('Page01Component', () => {
  let component: Page01Component;
  let fixture: ComponentFixture<Page01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
