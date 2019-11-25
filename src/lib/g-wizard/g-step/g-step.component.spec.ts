import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GStepComponent } from './g-step.component';

describe('GStepComponent', () => {
  let component: GStepComponent;
  let fixture: ComponentFixture<GStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
