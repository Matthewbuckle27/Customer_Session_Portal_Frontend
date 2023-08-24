import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ISession }  from '../../features/models/session.model';;
import { IUpdateSessionDto } from '../../features/models/session.model'
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private baseUrl = 'http://localhost:8080/sessions';
  constructor(private _http:HttpClient) { }

  getSessions(): Observable<ISession[]> {
    return this._http.get<ISession[]>('http://localhost:8080/sessions/getSessions');
  }

  getActiveSessions(): Observable<ISession[]> {
    return this.getSessions().pipe(
      map((sessions) => sessions.filter((session) => session.status === 'A'))
    );
  }

  getArchivedSessions(): Observable<ISession[]> {
    return this.getSessions().pipe(
      map((sessions) => sessions.filter((session) => session.status === 'X'))
    );
  }

  updateSession(sessionID: number, updateSessionDto: IUpdateSessionDto): Observable<ISession> {
    const url = `${this.baseUrl}/${sessionID}`;
    return this._http.put<ISession>(url, updateSessionDto);
  }
}
