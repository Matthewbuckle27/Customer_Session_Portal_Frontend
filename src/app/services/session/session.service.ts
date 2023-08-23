import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Session } from 'src/app/features/dashboard/dashboard.component';
import { UpdateSessionDto } from 'src/app/features/edit-session/edit-session.component';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private baseUrl = 'http://localhost:8080/sessions';
  constructor(private _http:HttpClient) { }

  getSessions(): Observable<Session[]> {
    return this._http.get<Session[]>('http://localhost:8080/sessions/getSessions');
  }

  getActiveSessions(): Observable<Session[]> {
    return this.getSessions().pipe(
      map((sessions) => sessions.filter((session) => session.status === 'A'))
    );
  }

  getArchivedSessions(): Observable<Session[]> {
    return this.getSessions().pipe(
      map((sessions) => sessions.filter((session) => session.status === 'X'))
    );
  }

  updateSession(sessionID: number, updateSessionDto: UpdateSessionDto): Observable<Session> {
    const url = `${this.baseUrl}/${sessionID}`;
    return this._http.put<Session>(url, updateSessionDto);
  }
}
