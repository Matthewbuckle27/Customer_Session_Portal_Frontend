import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteSessionComponent } from './delete-session.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SessionService } from '../../services/session-service/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { ISession, IResponseDto } from '../models/session.model';

describe('DeleteSessionComponent', () => {
  let component: DeleteSessionComponent;
  let fixture: ComponentFixture<DeleteSessionComponent>;
  let sessionService: SessionService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteSessionComponent],
      imports: [
        MatDialogModule,
        NoopAnimationsModule,
        HttpClientModule,
        MatSnackBarModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: jest.fn(), // Mock the close method
          },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        // Provide a mock sessionService
        {
          provide: SessionService,
          useValue: {
            deleteSession: jest.fn().mockReturnValue(
              of({ httpStatus: '200', message: 'Deleted successfully', sessionResponseDTO: {} } as IResponseDto)
            ),
          },
        },
        MatSnackBar,
      ],
    });
    fixture = TestBed.createComponent(DeleteSessionComponent);
    component = fixture.componentInstance;
    // Get an instance of MatSnackBar from TestBed
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog on onCancelClick', () => {
    // Call the onCancelClick method
    component.onCancelClick();
    // Expect that the close method of MatDialogRef has been called
    expect(TestBed.inject(MatDialogRef).close).toHaveBeenCalled();
  });

  it('should call sessionService.deleteSession and close dialog on deleteSession', () => {
    // Create a mock session object
    const mockSession: ISession = {
      sessionId: '1',
      sessionName: 'Sample Session',
      remarks: 'Sample Remarks',
      createdBy: 'RM1',
      createdOn: new Date(),
      updatedOn: new Date(),
      status: 'Active',
      customerName: 'Sample Customer',
      customerId: 'CB1',
      archiveFlag: 'false', // Corrected to a string value
      // Add other properties as needed
    };

    // Set the component's session to the mock session
    component.session = mockSession;

    // Call the deleteSession method
    component.deleteSession();

    // Expect that sessionService deleteSession method has been called with the correct session ID
    expect(TestBed.inject(SessionService).deleteSession).toHaveBeenCalledWith(mockSession.sessionId);
    // Expect that the close method of MatDialogRef has been called
    expect(TestBed.inject(MatDialogRef).close).toHaveBeenCalled();
  });
});
