import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn = false;
  private _userName = '';
  private storageKey = 'sunit';

  constructor() {
    
    const token = localStorage.getItem(this.storageKey);
    if (token) {
      this._isLoggedIn = true;
      this._userName = token;
    }
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  get username(): string {
    return this._userName;
  }

  login(username: string, password: string): boolean {
    if (username === 'LM1' && password === '123') {
      this._isLoggedIn = true;
      this._userName = username;
      localStorage.setItem(this.storageKey, username); 
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this._isLoggedIn = false;
    this._userName = '';
    localStorage.removeItem(this.storageKey); // Clear login status from localStorage
  }
}
