import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponses, ISession } from '../../features/models/session.model';
import { IUpdateSessionDto } from '../../features/models/session.model';
@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private sessions = 'http://localhost:8080/sessions';
  constructor(private http: HttpClient) {}

  getSessions(
    sessionStatus: string,
    offset: number,
    pageSize: number
  ): Observable<IApiResponses> {
    const url = `${this.sessions}/${sessionStatus}/${offset}/${pageSize}`;
    return this.http.get<IApiResponses>(url);
  }

  updateSession(
    sessionID: number,
    updateSessionDto: IUpdateSessionDto
  ): Observable<ISession> {
    const url = `${this.sessions}/${sessionID}`;
    return this.http.put<ISession>(url, updateSessionDto);
  }

  createSession(sessionData: any): Observable<ISession> {
    const url = `${this.sessions}`;
    return this.http.post<ISession>(url, sessionData);
  }
}
