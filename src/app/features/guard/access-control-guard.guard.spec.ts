import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { accessControlGuardGuard } from './access-control-guard.guard';

describe('accessControlGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => accessControlGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
