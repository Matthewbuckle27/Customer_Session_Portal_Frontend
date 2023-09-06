import { TestBed } from '@angular/core/testing';

import { SessionService } from './session.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { IApiResponses } from 'src/app/features/models/session.model';

describe('SessionService', () => {
  let service: SessionService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SessionService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch sessions', () => {
    const status = 'A';
    const offset = 0;
    const pageSize = 2;
    const dummyApiResponse: IApiResponses = {
      session: [
        {
          sessionId: 'Session000051',
          sessionName: 'durgam',
          customerName: 'Prashanth',
          remarks: 'ccccc',
          createdBy: 'Ram',
          createdOn: new Date('2023-09-05T17:46:33.27029'),
          status: 'A',
          archiveFlag: 'N',
          updatedOn: new Date('2023-09-05T17:48:49.948766'),
          customerId: 'Customer123',
        },
        {
          sessionId: 'Session000051',
          sessionName: 'durgam',
          customerName: 'Prashanth',
          remarks: 'ccccc',
          createdBy: 'Ram',
          createdOn: new Date('2023-09-05T17:46:33.27029'),
          status: 'A',
          archiveFlag: 'N',
          updatedOn: new Date('2023-09-05T17:48:49.948766'),
          customerId: 'Customer123',
        },
      ],
      totalElements: 35,
      totalPages: 18,
    };

    service.getSessions(status, offset, pageSize).subscribe((response) => {
      expect(response).toEqual(dummyApiResponse);
    });

    const req = httpTestingController.expectOne(
      `${service['sessions']}/${status}?pageNo=${offset}&pageSize=${pageSize}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyApiResponse);
  });
});
