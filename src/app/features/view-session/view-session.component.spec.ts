import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewSessionComponent } from './view-session.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ISession } from '../models/session.model';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';

describe('ViewSessionComponent', () => {
  let component: ViewSessionComponent;
  let fixture: ComponentFixture<ViewSessionComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSessionComponent],
      imports: [MatToolbarModule, MatIconModule, MatDialogModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {} as ISession,
        },
      ],
    });
    fixture = TestBed.createComponent(ViewSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
