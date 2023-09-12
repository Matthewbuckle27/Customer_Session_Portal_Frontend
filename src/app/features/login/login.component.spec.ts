import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication-service/auth.service';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Add NoopAnimationsModule

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        ReactiveFormsModule,
        MatInputModule,
        NoopAnimationsModule, // Include NoopAnimationsModule
      ],
      providers: [
        FormBuilder,
        {
          provide: Router,
          useValue: {
            navigate: jest.fn(), // Mock the router navigate function
          },
        },
        AuthService, // Add AuthService to providers
      ],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set errorMessage when loginForm is invalid', () => {
    // Set invalid values for username and password, exceeding the 10-character limit.
    component.loginForm.setValue({ username: 'admintoolong', password: 'admin123toolong' });

    // Call the login method which should set the errorMessage.
    component.login();

    // Assert that the errorMessage matches the expected value.
    expect(component.errorMessage).toBe('Username and password must be at most 10 characters long.');
  });

  it('should set errorMessage when authService.login returns false', () => {
    const authServiceSpy = jest.spyOn(authService, 'login').mockReturnValue(false);
    component.loginForm.setValue({ username: 'admin', password: 'admin123' });
    component.login();
    expect(authServiceSpy).toHaveBeenCalledWith('admin', 'admin123');
    expect(component.errorMessage).toBe('Invalid Credentials!');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to /home when authService.login returns true', () => {
    const authServiceSpy = jest.spyOn(authService, 'login').mockReturnValue(true);
    const routerSpy = jest.spyOn(router, 'navigate');
    component.loginForm.setValue({ username: 'admin', password: 'admin123' });
    component.login();
    expect(authServiceSpy).toHaveBeenCalledWith('admin', 'admin123');
    expect(component.errorMessage).toBe('');
    expect(routerSpy).toHaveBeenCalledWith(['/home']);
  });

  it('should not set errorMessage when loginForm is valid and authService.login returns true', () => {
    const authServiceSpy = jest.spyOn(authService, 'login').mockReturnValue(true);
    component.loginForm.setValue({ username: 'admin', password: 'admin123' });
    component.login();
    expect(authServiceSpy).toHaveBeenCalledWith('admin', 'admin123');
    expect(component.errorMessage).toBe('');
  });
});
