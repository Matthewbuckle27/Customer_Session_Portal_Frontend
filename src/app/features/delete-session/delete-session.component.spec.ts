import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteSessionComponent } from './delete-session.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('DeleteSessionComponent', () => {
  let component: DeleteSessionComponent;
  let fixture: ComponentFixture<DeleteSessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteSessionComponent],
      imports: [MatDialogModule, BrowserAnimationsModule,HttpClientModule, MatSnackBarModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {} 
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ],
    });
    fixture = TestBed.createComponent(DeleteSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
