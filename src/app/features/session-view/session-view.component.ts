import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-session-view',
  templateUrl: './session-view.component.html',
  styleUrls: ['./session-view.component.scss']
})
export class SessionViewComponent {
  constructor(
    public dialogRef: MatDialogRef<SessionViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }


}
