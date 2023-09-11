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
    const result = authService.login('LM1', '123');
    expect(result).toBe(true);
    expect(authService.isLoggedIn).toBe(true);
    expect(authService.username).toBe('LM1');
  });

  it('should not login with incorrect username or password', () => {
    const result = authService.login('user', 'password');
    expect(result).toBe(false); // Check the result of login
    expect(authService.isLoggedIn).toBe(false);
    expect(authService.username).toBe('');
  });

  it('should logout successfully', () => {
    authService.login('LM1', '123'); // Log in first
    authService.logout();
    expect(authService.isLoggedIn).toBe(false);
    expect(authService.username).toBe('');
  });

  it('should not be logged in when no token is stored in localStorage', () => {
    localStorage.removeItem('sunit'); // Remove the token
    authService = new AuthService(); // Reinitialize the service
    expect(authService.isLoggedIn).toBe(false);
    expect(authService.username).toBe('');
  });

  it('should initialize isLoggedIn and username when a token is present in localStorage', () => {
    localStorage.setItem('sunit', 'LM1'); // Add a token
    authService = new AuthService(); // Reinitialize the service
    expect(authService.isLoggedIn).toBe(true);
    expect(authService.username).toBe('LM1');
  });
});
