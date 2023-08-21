import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewSessionService {

  private baseUrl = 'http://localhost:3000/sessions';
  constructor(private http:HttpClient) { }

  createSession(sessionData: any): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.post(url, sessionData);
  }
}
