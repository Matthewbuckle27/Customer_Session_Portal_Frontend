import { TestBed } from '@angular/core/testing';
import { NewSessionService } from './new-session.service';

describe('NewSessionService', () => {
  let service: NewSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
