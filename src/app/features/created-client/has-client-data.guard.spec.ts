import { TestBed } from '@angular/core/testing';

import { HasClientDataGuard } from './has-client-data.guard';

describe('HasClientDataGuard', () => {
  let guard: HasClientDataGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasClientDataGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
