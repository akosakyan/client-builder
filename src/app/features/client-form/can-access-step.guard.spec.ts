import { TestBed } from '@angular/core/testing';

import { CanAccessStepGuard } from './can-access-step.guard';

describe('CanAccessStepGuard', () => {
  let guard: CanAccessStepGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanAccessStepGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
