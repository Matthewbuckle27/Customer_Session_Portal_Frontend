// import { CanActivateFn, Router } from '@angular/router';
// import { LoginServiceService } from './app/services/login-service.service';

// export const accessControlGuardGuard: CanActivateFn = (route, state) => {
//   if(this.login.logged){
//     return true;
//   }else{
//       this.router.navigateByUrl("login");
//       return false;
//   }
// }
// constructor(private login:LoginServiceService, private router:Router){}

// };
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginServiceService } from '../../services/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class AccessControlGuard implements CanActivate {
  constructor(private login: LoginServiceService, private router: Router) {}

  canActivate(): boolean {
    if (this.login.logged) {
      return true;
    } else {
      this.router.navigateByUrl("login");
      return false;
    }
  }
}

