import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Session } from '../dashboard/dashboard.component';
import { SessionService } from '../../services/session/session.service'
import { ToastrService } from 'ngx-toastr';
import { IUpdateSessionDto } from '../models/session.model';
@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.scss']
})
export class EditSessionComponent {
  loading = false;
  updateButtonDisabled = true;
  editForm!: FormGroup
  constructor(private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public session: Session,
    private _dialogRef: MatDialogRef<EditSessionComponent>,
    private _toastrService: ToastrService,
    private _sessionService: SessionService) {
    this.editForm = this._formBuilder.group({
      customerName: new FormControl({ value: this.session.customerName, disabled: true }),
      sessionName: new FormControl(this.session.sessionName, [Validators.required, Validators.minLength(8)]),
      remarks: new FormControl(this.session.remarks, [Validators.required, Validators.minLength(10)])
    })
  }

  ngOnInit(): void {
    this.editForm.valueChanges.subscribe((value) => {
      this.updateButtonDisabled = JSON.stringify(value) === JSON.stringify(this.session);
    });
  }

  onEditFormSubmit() {
    if (this.editForm.valid) {
      this.loading = true;
      const updateDto: IUpdateSessionDto = {
        sessionName: this.editForm.value.sessionName,
        customerName: this.session.customerName,
        remarks: this.editForm.value.remarks,
        createdBy: this.session.createdBy
      };
      setTimeout(() => {
        this._sessionService.updateSession(this.session.sessionID, updateDto).subscribe(
          () => {
            this._toastrService.success('Session successfully updated', 'Success');
            this._dialogRef.close(updateDto);
          },
          (error: any) => {
            console.error('Error updating session:', error);
            if (error.status === 400) {
              this._toastrService.error(error.error.response, 'Error');
              this._dialogRef.close();
            }
          }
        ).add(() => {
          this.loading = false;
        });
      }, 2000);
    }
  }

  onClose(): void {
    this._dialogRef.close();
  }
}