import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SessionService } from '../../services/session-service/session.service';
import { ICreateSessionDto } from '../models/session.model';
import { Router } from '@angular/router';

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
    private route:Router
  ) {}

  createSessionForm = this.fb.group({
    customerId: ['', [Validators.required]],
    sessionName: ['', [Validators.required,Validators.minLength(4),Validators.pattern('[a-zA-Z0-9 ]*')]],
    remarks: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(255)]],
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
    this.isLoading=true;
    localStorage.setItem('RMname','RM1')
    const sessionData: ICreateSessionDto = {
    customerId: this.createSessionForm.value.customerId || '',
    sessionName: this.createSessionForm.value.sessionName||'',
    remarks: this.createSessionForm.value.remarks||'',
    createdBy: localStorage.getItem('RMname') || ''
  };
  
  this.sessionservice.createSession(sessionData).subscribe(
    () => {
      this.route.navigateByUrl('/home');
      this.closeModal();
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
