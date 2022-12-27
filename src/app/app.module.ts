import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './services/auth.guard';
import { NgxPaginationModule } from 'ngx-pagination';
import { RegisterComponent } from './register/register.component';
import { ManagerComponent } from './manager/manager.component';
import { EmployeeComponent } from './employee/employee.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditComponent } from './edit/edit.component';
import { EmployeeListComponent } from './manager/employee-list/employee-list.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  
  
    AdminComponent,
    UserComponent,
    RegisterComponent,
    ManagerComponent,
    EmployeeComponent,
    ViewProfileComponent,
    EditComponent,
    EmployeeListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
