import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Page05Component } from './page05.component';

describe('Page05Component', () => {
  let component: Page05Component;
  let fixture: ComponentFixture<Page05Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page05Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page05Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
