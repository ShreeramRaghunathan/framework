import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageselectionComponent } from './languageselection.component';

describe('LanguageselectionComponent', () => {
  let component: LanguageselectionComponent;
  let fixture: ComponentFixture<LanguageselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
