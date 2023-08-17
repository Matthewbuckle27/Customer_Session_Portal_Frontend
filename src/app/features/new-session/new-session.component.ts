import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.scss']
})
export class NewSessionComponent {
  
  constructor(private popup: MatDialogRef<NewSessionComponent>, private fb:FormBuilder) {}


  
  createSessionForm=this.fb.group({
    customerName:['', [Validators.required]],
    sessionName:['', [Validators.required]],
    remarks:['',[Validators.required]]
  });
  

    get customerName() { return this.createSessionForm.get("customerName") }
    get sessionName() { return this.createSessionForm.get("sessionName") }
    get remarks() { return this.createSessionForm.get("remarks") }


  createSession() {
    this.closeModal();
    console.log(this.createSessionForm.value);
  }

  closeModal() {
    this.popup.close();
  }

}
