import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/authentication-service/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [AuthService],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
      ],
    });
    const dummyUsernameElement = document.createElement('div');
    dummyUsernameElement.id = 'username';
    document.body.appendChild(dummyUsernameElement);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    const dummyUsernameElement = document.getElementById('username');
    if (dummyUsernameElement) {
      dummyUsernameElement.remove();
    }
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
