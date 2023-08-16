import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
// import { AccessControlGuard } from 'src/app/features/guard/access-control-guard.guard';

const routes: Routes = [
  {
    path:"home", component:DashboardComponent 
  },
  {
    path:"", redirectTo:"home", pathMatch:"full"
  },
  {
    path:"login", component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
