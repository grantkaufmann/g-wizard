import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GWizardComponent } from './g-wizard.component';

describe('GWizardComponent', () => {
  let component: GWizardComponent;
  let fixture: ComponentFixture<GWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
