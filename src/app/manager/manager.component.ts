import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  getporject: any;
  editproject!: FormGroup;
  addproject!: FormGroup
  details: any;
  isShowDiv = true;
  dropdownList: any = [];
  dropdownSettings: any = {};
  selectedItems: any = [];
  dropDownForm: any;
  updatedone: any;
  memberid: any;
  members: any;
  deSelectId: any;
  removed: any;
  projId: any;
  SelectId: any;
  filterd: any;
  loggedin: any;
  managerproject: any;
  mangerfiltered: any;
  constructor(private userservice: UserService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loggedin = localStorage.getItem("filtered")
    this.filterd = JSON.parse(this.loggedin)
    this.get();
    this.initprojectform();

    this.getallusers();


  }
  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
  }

  get() {

    this.userservice.projet().subscribe((res: any) => {
     this.managerproject=res.projects
      //  console.log("findproj",this.filterd[0].id)
        this.mangerfiltered = this.managerproject.filter((value: any) => value.id == this.filterd[0].id);
       console.log("findproj", this.mangerfiltered )
       if(this.mangerfiltered.length>0){
        this.getporject = this.mangerfiltered
        // if (res.statusCode === 200) {

        //   this.getporject = res.projects
        //   console.log("result", this.getporject)
        // }
       }
     
      else {
        console.log("no projects")
      }
    })
  }


  Add() {
    console.log("new values", this.addproject.value)
    this.userservice.addproject(this.addproject.value).subscribe((res: any) => {
      // alert(res.message)
      console.log("new values", res)
    })
    window.location.reload();
  }
  getviewprojectdetail(id: any) {
    console.log("selected ", id)
  }


  getprojectdetail(id: any) {
    this.details = this.getporject.filter((u: any) => u.Project_ID === id)[0];
    console.log("details", this.details)
    console.log("selected ", id)
    this.selectedItems = this.details.member;

    this.editproject = this.fb.group({
      Project_ID: this.details.Project_ID,
      Project_Name: this.details.Project_Name,
      Company_Name: this.details.Company_Name,
      Project_Status: this.details.Project_Status,
      Company_Phone: this.details.Company_Phone,
      Employee_ID_Number: this.details.Employee_ID_Number,
      project_Start_Date: this.details.project_Start_Date,
      project_End_Date: this.details.project_End_Date, member: ([this.selectedItems])
    });

  }

  some(){

    console.log("filtered manager",this.filterd[0].id)
    this.addproject = this.fb.group({
      Project_ID: [""],
        Project_Name: ["", [Validators.required]],
        Company_Name: ["", [Validators.required]],
        Project_Status: ["", [Validators.required]],
        Company_Phone: ["", [Validators.required]],
        Employee_ID_Number: ["", [Validators.required]],
        project_Start_Date: ["", [Validators.required]],
        project_End_Date: ["", [Validators.required]],
        member: ["", [Validators.required]],
      id:this.filterd[0].id,
    })
    console.log("id coming",this.addproject.value.id)
  }

  onsubmit() {

    this.editproject.controls['members'] = this.members;
    let addobj = {
      Project_ID: this.editproject.controls['Project_ID'].value,
      Project_Name: this.editproject.controls['Project_Name'].value,
      Company_Name: this.editproject.controls['Company_Name'].value,
      Project_Status: this.editproject.controls['Project_Status'].value,
      Company_Phone: this.editproject.controls['Company_Phone'].value,
      Employee_ID_Number: this.editproject.controls['Employee_ID_Number'].value,
      project_Start_Date: this.editproject.controls['project_Start_Date'].value,
      project_End_Date: this.editproject.controls['project_End_Date'].value,
      member: this.selectedItems
    }
    this.userservice.updateproject(this.editproject.value).subscribe((res: any) => {
      console.log("pushing to api", res)
    })
    console.log("After edited details", this.editproject.value)
  }
  initprojectform() {
   
    this.editproject = this.fb.group({
      Project_ID: ["", [Validators.required]],
      Project_Name: ["", [Validators.required]],
      Company_Name: ["", [Validators.required]],
      Project_Status: ["", [Validators.required]],
      Company_Phone: ["", [Validators.required]],
      Employee_ID_Number: ["", [Validators.required]],
      project_Start_Date: ["", [Validators.required]],
      project_End_Date: ["", [Validators.required]],
      member: ["", [Validators.required]]
    })
    this.addproject = this.fb.group({
      Project_ID: [""],
      id:[""],
      Project_Name: ["", [Validators.required]],
      Company_Name: ["", [Validators.required]],
      Project_Status: ["", [Validators.required]],
      Company_Phone: ["", [Validators.required]],
      Employee_ID_Number: ["", [Validators.required]],
      project_Start_Date: ["", [Validators.required]],
      project_End_Date: ["", [Validators.required]],
      member: ["", [Validators.required]]
    })

  }
  getallusers() {

    this.userservice.fetchdropallusers().subscribe((res: any) => {
      // console.log("users",res.users)
      this.dropdownList = res.users
    })
    this.dropdownSettings = {
      idField: 'id',
      textField: 'firstname',
    };
  }
  

  
  
  onItemDeSelect(item: any, projId: any) {
    var result = confirm("Want to delete?");
    if (result) {
      this.deSelectId = item.id
      this.projId = projId
      this.userservice.deleteUserProject(this.deSelectId, this.projId).subscribe((res: any) => {
        if (res.statusCode === 200) {
          alert("Updated Successfully");
          window.location.reload();
        } else {
          alert("Please Try Again")
        }
      })
    }
  }
  onItemSelect(item: any, projId: any) {
    alert(item.id)
    this.SelectId = item.id
    this.projId = projId
    this.userservice.deleteUserPreviousProject(this.SelectId, this.projId).subscribe((res: any) => {
      if (res.statusCode === 200) {
        // alert("Please Click On Submit");
      } else {
        alert("Please Try Again")
      }
    })
  }
  
  
  
  
  logout() {
    localStorage.removeItem("Token")
    this.router.navigate(['/'])
  }

}
