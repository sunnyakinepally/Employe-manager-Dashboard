import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ManagerComponent } from './manager/manager.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './services/auth.guard';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './manager/employee-list/employee-list.component';
const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
{
  path:'register',
  component:RegisterComponent

},
  {
    path:'user',
    component:UserComponent,canActivate:[AuthGuard]
  },
  // {
  //   path:'admin',
  //   component:AdminComponent,canActivate:[AuthGuard]
  // },
{
  path:'manager',
  component:ManagerComponent,canActivate:[AuthGuard]
},
{
path:'employee',
component:EmployeeComponent,canActivate:[AuthGuard]
},
{

  path:'employee-list',

  component:EmployeeListComponent,
  canActivate:[AuthGuard]

}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
