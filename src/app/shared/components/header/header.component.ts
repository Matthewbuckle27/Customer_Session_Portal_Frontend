import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../../../services/login-service.service';
import { AppRoutes } from '../../constants/string-constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    public loginService: LoginServiceService,
    private router: Router
  ) {}

  logOut() {
    this.loginService.logout();
    localStorage.clear();
    this.router.navigateByUrl(AppRoutes.LOGIN);
  }
}
