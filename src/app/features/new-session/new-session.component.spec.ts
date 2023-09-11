import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NewSessionComponent } from './new-session.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SessionService } from '../../services/session-service/session.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { IResponseDto } from '../models/session.model';

describe('NewSessionComponent', () => {
  let component: NewSessionComponent;
  let fixture: ComponentFixture<NewSessionComponent>;
  let sessionService: SessionService;
  let toastrService: ToastrService;

  beforeEach(() => {
    const matDialogRefStub = {};

    TestBed.configureTestingModule({
      declarations: [NewSessionComponent],
      imports: [
        MatDialogModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefStub },
        ToastrService,
      ],
    });

    fixture = TestBed.createComponent(NewSessionComponent);
    component = fixture.componentInstance;
    sessionService = TestBed.inject(SessionService);
    toastrService = TestBed.inject(ToastrService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set RMname in localStorage and create a session', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    const sessionData = {
      customerId: '123',
      sessionName: 'Test Session',
      remarks: 'Test remarks',
      createdBy: 'Ram',
    };
    const createSessionSpy = jest
      .spyOn(sessionService, 'createSession')
      .mockReturnValueOnce(
        of({ message: 'Session created successfully' } as IResponseDto)
      );

    component.createSessionForm.patchValue(sessionData);
    component.createSession();
    expect(setItemSpy).toHaveBeenCalledWith('RMname', 'Ram');
    expect(createSessionSpy).toHaveBeenCalledWith(sessionData);
  });
  
  it('should handle session creation success', () => {
    const setItemSpy = spyOn(localStorage, 'setItem');
    const toastrService = TestBed.inject(ToastrService); 
    const toastrSuccessSpy = spyOn(toastrService, 'success');
    const sessionData = {
      customerId: '123',
      sessionName: 'Test Session',
      remarks: 'Test remarks',
      createdBy: 'Ram'
    };
    const createSessionSpy = spyOn(sessionService, 'createSession').and.returnValue(
      of({ message: 'Session created successfully' } as IResponseDto)
    );
    component.createSessionForm.patchValue(sessionData);
    component.createSession();

    expect(setItemSpy).toHaveBeenCalledWith('RMname', 'Ram');
    expect(createSessionSpy).toHaveBeenCalledWith(sessionData);
    expect(toastrSuccessSpy).toHaveBeenCalledWith('Session created successfully', 'Success');
  });
  
  it('should handle session creation failure', () => {
    const createSessionSpy = jest
      .spyOn(sessionService, 'createSession')
      .mockReturnValue(throwError('Error occurred'));
    const toastrErrorSpy = jest.spyOn(toastrService, 'error');
    component.createSession();
    expect(createSessionSpy).toHaveBeenCalled();
    expect(toastrErrorSpy).toHaveBeenCalledWith(
      'Failed to create the session!',
      'Error'
    );
    expect(component.isLoading).toBe(false);
  });

  it('should close the popup on onClose', () => {
    const closeSpy = jest.spyOn(component as any, 'closeModal');
    component.onClose();
    expect(closeSpy).toHaveBeenCalled();
  });
});
