import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  userDetails: any;
  filteredperson: any;
  allUsers: any;

  constructor( private userservice: UserService,  private router: Router) { }


  ngOnInit(): void {
    this.getEmployeeList();
  }
  getEmployeeList() {
  
    this.userservice.fetchallusers().subscribe((res: any) => {
      this.userDetails = res.users
      this.allUsers = res.users.filter((u: any) => u.Designation == 'employee' || u.Designation == '');

      // console.log("all users",this.allUsers)
      
    })
  }

  getemployee(id:any){
 
   this.filteredperson = this.userDetails.filter((value: any) => value.id == id);
   console.log("filteredperson",this.filteredperson)
  }



}
