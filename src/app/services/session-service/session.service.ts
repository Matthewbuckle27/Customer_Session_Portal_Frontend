import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponses, ICreateSessionDto, IResponseDto, ISession } from '../../features/models/session.model';
import { IUpdateSessionDto } from '../../features/models/session.model';
@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private sessions = 'http://localhost:8080/sessions';
  constructor(private http: HttpClient) {} 
  getSessions(
    status: string,
    offset: number,
    pageSize: number
  ): Observable<IApiResponses> {
    const params = new HttpParams()
      .set('pageNo', offset.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<IApiResponses>(`${this.sessions}/${status}`, {
      params});
  }

  updateSession(
    sessionID: number,
    updateSessionDto: IUpdateSessionDto
  ): Observable<IResponseDto> {
    const url = `${this.sessions}/${sessionID}`;
    return this.http.put<IResponseDto>(url, updateSessionDto);
  }

  createSession(sessionData: ICreateSessionDto): Observable<ISession> {
    const url = `${this.sessions}`;
    return this.http.post<ISession>(url, sessionData);
  }

  deleteSession(sessionID: number): Observable<any> {
    const url = `${this.sessions}/${sessionID}`;
    return this.http.delete(url);
  }
  archiveSession(sessionId: number): Observable<IResponseDto> {
    const url = `${this.sessions}/archive/${sessionId}`;
    return this.http.put<IResponseDto>(url, null);
  }

}
