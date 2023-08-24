import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Session } from '../features/dashboard/dashboard.component';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private sessionsUrl = '../../assets/sessions.json';
  constructor(private http: HttpClient) {}

  getSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(this.sessionsUrl);
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

}
