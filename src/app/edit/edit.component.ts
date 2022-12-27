import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editprofile!: FormGroup;
  loggedin: any
  filterd: any;
  details: any;
  skills!: FormGroup;
  skillsfetched: any;
  skill: any;
  
  constructor(private userservice: UserService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initprojectform();
    
    this.loggedin = localStorage.getItem("filtered")
    // console.log("loggedin", JSON.parse(this.loggedin))
    this.filterd = JSON.parse(this.loggedin)
  
    this.skillsfetched=localStorage.getItem("skills")
    // console.log("fetched", JSON.parse(this.skillsfetched))
    this.skill=JSON.parse(this.skillsfetched)
    // console.log("skillsfetched",this.skill[0].skills)
  }
patch(){

  
  this.editprofile = this.fb.group({
    id:this.filterd[0].id,
    firstname:this.filterd[0].firstname,
    middlename: this.filterd[0].middlename,
    lastname:this.filterd[0].lastname,
    date_of_birth:  this.filterd[0].date_of_birth,
    mobile_number: this.filterd[0].mobile_number,
    password: this.filterd[0].password,
    address:this.filterd[0].address,
    Postal_Code: this.filterd[0].Postal_Code,
    Qualification:  this.filterd[0].Qualification,
    total_Experience:  this.filterd[0].total_Experience,
    Gender:  this.filterd[0].Gender,
    Marital_Status:  this.filterd[0].Marital_Status,
    Start_Date_Date:  this.filterd[0].Start_Date_Date,
    End_Date_Date:  this.filterd[0].End_Date_Date,
  });

  // this.skills = this.fb.group({
  //   skills:this.skill[0].skills
 
  // })
}
  initprojectform() {
    // this.dropDownForm = this.fb.group({ myItems: [this.selectedItems]   });

    this.editprofile = this.fb.group({
      id:["", [Validators.required]],
      firstname: ["", [Validators.required]],
      middlename: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      date_of_birth:  ["", [Validators.required]],
      mobile_number:  ["", [Validators.required]],
      password:  ["", [Validators.required]],
      address: ["", [Validators.required]],
      Postal_Code: ["", [Validators.required]],
      Qualification:  ["", [Validators.required]],
      total_Experience:  ["", [Validators.required]],
      Gender:  ["", [Validators.required]],
      Marital_Status:  ["", [Validators.required]],
      Start_Date_Date:  ["", [Validators.required]],
      End_Date_Date:  ["", [Validators.required]],
    })


    // this.skills = this.fb.group({
    //   skills: ["", [Validators.required]],
   
    // })
  
}

onsubmit(){
  this.userservice.profileupdate(this.editprofile.value).subscribe((res:any)=>{
    console.log("updatedprofile",res)
    alert(res.message)
    window.location.reload();
  })
}




}
