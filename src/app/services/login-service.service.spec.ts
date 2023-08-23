import { TestBed } from '@angular/core/testing';

import { LoginServiceService } from './login-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginServiceService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[LoginServiceService],
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(LoginServiceService);
    expect(service).toBeTruthy();
  });
});
