// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { NewSessionComponent } from './new-session.component';
// describe('NewSessionComponent', () => {
//   let component: NewSessionComponent;
//   let fixture: ComponentFixture<NewSessionComponent>;

//   beforeEach(() => {
//     const matDialogRefStub = {
//       close: jasmine.createSpy('close'),
//     };
//     TestBed.configureTestingModule({
//       declarations: [NewSessionComponent],
//       imports: [MatDialogModule],
//       providers: [
//         { provide: MatDialogRef, useValue: matDialogRefStub },
//       ],
//     });
//     fixture = TestBed.createComponent(NewSessionComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NewSessionComponent } from './new-session.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('NewSessionComponent', () => {
  let component: NewSessionComponent;
  let fixture: ComponentFixture<NewSessionComponent>;

  beforeEach(() => {
    const matDialogRefStub = {
      close: jest.fn(), 
    };

    TestBed.configureTestingModule({
      declarations: [NewSessionComponent],
      imports: [MatDialogModule, HttpClientTestingModule, MatSnackBarModule],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefStub },
      ],
    });

    fixture = TestBed.createComponent(NewSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
