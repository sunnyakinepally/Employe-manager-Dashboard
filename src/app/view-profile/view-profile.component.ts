import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  loggedin: any
  filterd: any;
  details: any;
  editprofile!: FormGroup;
  user: any;
  userDetails: any;
  filteredperson: any;
 

  constructor(private userservice: UserService, private fb: FormBuilder, private router: Router) { }


  ngOnInit(): void {
    this.ValidateLogin();
    this.loggedin = localStorage.getItem("filtered")
    // console.log("loggedin", JSON.parse(this.loggedin))
    this.filterd = JSON.parse(this.loggedin)
   
    
  }
  ValidateLogin() {
  
    this.userservice.fetchallusers().subscribe((res: any) => {
      this.userDetails = res.users
    // console.log("logindata",  this.userDetails)
     this.filteredperson = this.userDetails.filter((value: any) => value.mobile_number == this.filterd[0].mobile_number);
    console.log("filtered person", this.filteredperson)
      
    })

 
  }

}
