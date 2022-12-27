import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  fetchlogin:any;
  logindata:any;
  fetchfilterdata:any;
  filterdata:any;
  constructor( private router: Router,private userservice:UserService ) {}  
  canActivate(): boolean {  
   if( this.userservice.loggedin()){
    return true
   }else{
   
    this.router.navigate(['/'])
    return false
   }
      // this.fetchlogin=localStorage.getItem('LoginData')
      // this.logindata=JSON.parse(this.fetchlogin);
      // this.fetchfilterdata=localStorage.getItem('filtered')
      // this.filterdata=JSON.parse(this.fetchfilterdata)
      // if(this.logindata && this.filterdata.length>0){
      //   if(this.logindata.user ==this.filterdata[0].user_name && this.logindata.pass== this.filterdata[0].password)
      //  { 
     
      //   return true
      // }else
      // {
      //   this.router.navigate([''])
      //   return false
      // }}
      // else{
      //   this.router.navigate([''])
      //   return false
      // }
  } 
}
