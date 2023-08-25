import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SessionService } from 'src/app/services/session-service/session.service';

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
    private sessionservice: SessionService
  ) {}

  createSessionForm = this.fb.group({
    customerId: ['', [Validators.required]],
    customerName: ['', [Validators.required]],
    sessionName: ['', [Validators.required]],
    remarks: ['', [Validators.required]],
  });
  get customerId() {
    return this.createSessionForm.get('customerId');
  }
  get customerName() {
    return this.createSessionForm.get('customerName');
  }
  get sessionName() {
    return this.createSessionForm.get('sessionName');
  }
  get remarks() {
    return this.createSessionForm.get('remarks');
  }

  createSession() {
    this.isLoading = true;
    const sessionData = this.createSessionForm.value;
    this.sessionservice.createSession(sessionData).subscribe(
      (next) => {
        alert('Added Sucessfully');
        this.closeModal();
      },
      (error) => {
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
