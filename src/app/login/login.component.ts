import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: any;
  list: any;
  userDetails: any;
  userdeatail: any;
  loggeddata: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initLoginForm();
    // this.userService.fetchUser().subscribe((res: any) => {
    //   this.userDetails = res.users
    // })
    this.userService.fetchallusers().subscribe((res: any) => {
      this.userDetails = res.users
    })


  }

  initLoginForm() {
    this.login = this.fb.group({
      // user: ["", [Validators.required]],
      pass: ["", [Validators.required]],
      mobile_number: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    })

  }

  ValidateLogin() {
    let LoginData = this.login.value
    console.log("login data", LoginData)

    const filtered = this.userDetails.filter((value: any) => value.mobile_number == LoginData.mobile_number);
    console.log("filtered", filtered)
    if (filtered.length != 0) {
      if (LoginData.mobile_number == filtered[0].mobile_number && LoginData.pass == filtered[0].password) {
        localStorage.setItem('LoginData', JSON.stringify(LoginData))
        localStorage.setItem('filtered', JSON.stringify(filtered))
        if (filtered[0].Designation == 'manager') {

          this.userService.fetchlogin(this.login.value).subscribe((res: any) => {

            if (res.statusCode === 200) {
              alert('loged in successfully');
              localStorage.setItem("Token", res.token)
              localStorage.setItem("userid", res.id)
              this.router.navigate(['/manager'])
            } else {
              alert('invaid details')
            }
          })

        }
        else if (filtered[0].Designation == 'employee') {
          this.userService.fetchlogin(this.login.value).subscribe((res: any) => {
            if (res.statusCode === 200) {
              alert('loged in successfully');
              localStorage.setItem("Token", res.token)
              localStorage.setItem("userid", res.id)
              this.router.navigate(['/employee'])
            } else {
              alert('invaid details')
            }

          })

        }
      }
    } else {

      alert("enter valid credentials");
    }
    // this.userService.fetchlogin(this.login.value).subscribe((res: any) => {
    //   // console.log("login data", res)
    //   if (res.statusCode === 200) {
    //     alert('loged in successfully');
    //     localStorage.setItem("Token",res.token)

    //     this.router.navigate(['/manager'])
    //   }else{
    //     alert('invaid details')
    //   }


    // })
  }


}
