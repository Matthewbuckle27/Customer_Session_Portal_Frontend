import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SessionService } from 'src/app/services/session-service/session.service';
import { ISession } from '../models/session.model';

@Component({
  selector: 'app-delete-session',
  templateUrl: './delete-session.component.html',
  styleUrls: ['./delete-session.component.scss']
})
export class DeleteSessionComponent {
  constructor(
    public _dialogRef: MatDialogRef<DeleteSessionComponent>,
    @Inject(MAT_DIALOG_DATA) public session: ISession,
    private sessionService: SessionService
  ) { }

  onCancelClick(): void {
    this._dialogRef.close();
  }

  deleteSession() {
    this.sessionService.deleteSession(this.session.sessionId).subscribe(
      () => {
        this._dialogRef.close();
      },
      (error) => {
        this._dialogRef.close();
      }
    )
  }
}
