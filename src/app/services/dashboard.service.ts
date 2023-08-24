import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponses } from '../features/models/session.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
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

}
