// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { EditSessionComponent } from './edit-session.component';
// import { MatDialogModule } from '@angular/material/dialog';
// import { InjectionToken } from '@angular/core'; 
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

// const matMdcDialogData: InjectionToken<unknown> = new InjectionToken<unknown>('MatMdcDialogData');

// describe('EditSessionComponent', () => {
//   let component: EditSessionComponent;
//   let fixture: ComponentFixture<EditSessionComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [EditSessionComponent],
//       imports: [MatDialogModule, BrowserAnimationsModule],
//       providers: [
//         {
//           provide: MatDialogRef,
//           useValue: {} 
//         },
//         {
//           provide: MAT_DIALOG_DATA, 
//           useValue: {}
//         },
//         {
//           provide: matMdcDialogData, 
//           useValue: {}
//         }
//       ],
//     });
//     fixture = TestBed.createComponent(EditSessionComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditSessionComponent } from './edit-session.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, InjectionToken } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Define InjectionToken for ToastConfig
const toastConfigToken: InjectionToken<any> = new InjectionToken<any>('ToastConfig');

describe('EditSessionComponent', () => {
  let component: EditSessionComponent;
  let fixture: ComponentFixture<EditSessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSessionComponent],
      imports: [MatDialogModule, BrowserAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
        {
          provide: toastConfigToken, // Provide the InjectionToken
          useValue: {} // You can provide a proper value here if needed
        }
      ],
    });
    fixture = TestBed.createComponent(EditSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

