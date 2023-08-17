import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn = false;
  private _username = '';

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  get username(): string {
    return this._username;
  }

  login(username: string, password: string): boolean {

    if (username === 'admin' && password === '123') {
      this._isLoggedIn = true;
      this._username = username;
      return true;
    } else if (username === 'ruchi' && password === '1234') {
      this._isLoggedIn = true;
      this._username = username;
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this._isLoggedIn = false;
    this._username = '';
  }
}
