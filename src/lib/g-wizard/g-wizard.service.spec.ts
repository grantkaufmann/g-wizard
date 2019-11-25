import { TestBed } from '@angular/core/testing';

import { GWizardService } from './g-wizard.service';

describe('GWizardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GWizardService = TestBed.get(GWizardService);
    expect(service).toBeTruthy();
  });
});
