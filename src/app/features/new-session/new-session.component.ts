import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SessionService } from '../../services/session-service/session.service';
import { ICreateSessionDto, IResponseDto } from '../models/session.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.scss'],
})
export class NewSessionComponent {
  isLoading = false;
  errorMessage = '';

  constructor(
    private popup: MatDialogRef<NewSessionComponent>,
    private fb: FormBuilder,
    private sessionservice: SessionService,
    private toastrService: ToastrService
  ) {}

  createSessionForm = this.fb.group({
    customerId: ['', [Validators.required]],
    sessionName: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('^[a-zA-Z0-9 ]+$'),
      ],
    ],
    remarks: [
      '',
      [Validators.required, Validators.maxLength(255), Validators.minLength(4)],
    ],
  });
  get customerId() {
    return this.createSessionForm.get('customerId');
  }
  get sessionName() {
    return this.createSessionForm.get('sessionName');
  }
  get remarks() {
    return this.createSessionForm.get('remarks');
  }

  createSession() {
    localStorage.setItem('RMname', 'Ram');
    const sessionData: ICreateSessionDto = {
      customerId: this.createSessionForm.value.customerId || '',
      sessionName: this.createSessionForm.value.sessionName || '',
      remarks: this.createSessionForm.value.remarks || '',
      createdBy: localStorage.getItem('RMname') || '',
    };
    this.sessionservice.createSession(sessionData).subscribe(
      (x: IResponseDto) => {
        this.closeModal();
        this.toastrService.success(`${x.message}`, 'Success');
      },
      () => {
        this.errorMessage = 'Failed to create the session!';
        this.isLoading = false;
      }
    );
  }
  closeModal() {
    this.popup.close();
  }
  onClose() {
    this.popup.close();
  }
}
