import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should return isLoggedIn as false initially', () => {
    expect(authService.isLoggedIn).toBe(false);
  });

  it('should return an empty string for username initially', () => {
    expect(authService.username).toBe('');
  });

  it('should login with correct username and password', () => {
    const result = authService.login('admin', 'admin123');
    expect(result).toBe(true);
    expect(authService.isLoggedIn).toBe(true);
    expect(authService.username).toBe('admin');
  });

  it('should not login with incorrect username or password', () => {
    const result = authService.login('user', 'password');
    expect(result).toBe(false);
    expect(authService.isLoggedIn).toBe(false);
    expect(authService.username).toBe('');
  });

  it('should logout successfully', () => {
    authService.login('admin', 'admin123'); // Log in first
    authService.logout();
    expect(authService.isLoggedIn).toBe(false);
    expect(authService.username).toBe('');
  });
});
