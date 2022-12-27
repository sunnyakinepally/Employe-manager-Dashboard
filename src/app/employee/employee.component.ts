import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  loggedin: any;
  filterd: any;
  projectsarry: any;
  todayDate: any;
  currentProject: any = [];
  previousProject: any = [];
  currdetails: any;
  prevdetails: any;
  skills: any;
  addskill!: FormGroup;
  name: any;
  user: any;
  projects: any;
  filterproj: any;
  uid: any;
  filterproj2: any;

  constructor(private router: Router, private userservice: UserService, private fb: FormBuilder,) { }
  ngOnInit(): void {
    this.initprojectform();
    this.loggedin = localStorage.getItem("filtered")
    this.filterd = JSON.parse(this.loggedin)
    // console.log("fill",this.filterd[0].id)
    this.uid = this.filterd[0].id
    this.projectsarry = this.filterd[0].projects;
    // this.todayDate = this.currentDate()
    // for (var i in this.projectsarry) {
    //   if (this.projectsarry[i].project_End_Date > this.todayDate) {
    //     this.currentProject.push(this.projectsarry[i])
    //   }else if (this.projectsarry[i].project_End_Date < this.todayDate){
    //     this.previousProject.push(this.projectsarry[i])
    //   }
    // }

    this.userpreviousproject()
this.usercurrantproj()



  }

  ViewCurrentprojectdetail(id: any) {
    this.currdetails = this.currentProject.filter((u: any) => u.Project_ID === id)[0];
    console.log("this.currdetails", this.currdetails)
  }
  ViewPrevprojectdetail(id: any) {
    this.prevdetails = this.previousProject.filter((u: any) => u.Project_ID === id)[0];
  }
  currentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }
  fetchskills() {
    this.userservice.skills().subscribe((res: any) => {
      if (res.statusCode === 200) {
        const userSkills = res.skills
        this.skills = userSkills.filter((u: any) => u.id === this.filterd[0].id)[0].skills;
        // localStorage.setItem("skills",JSON.stringify(this.skills) )
      }
      else {
        console.log("no skills")
      }
    })
  }
  delete(id: any, empid: any) {
    console.log("name", name)
    empid = this.filterd[0].id
    this.userservice.employeeskilldelete(id, empid).subscribe((res: any) => {
      // alert(res.message)
      console.log("selected", res.id, res.name)
    })
    window.location.reload()
  }


  initprojectform() {

    this.addskill = this.fb.group({
      name: ["", [Validators.required]],
    })


  }
  onsubmit(){
    console.log(this.addskill.value)
      const empid=this.filterd[0].id
      this.name=this.addskill.value.name
      console.log("name",this.name)
    this.userservice.addskill(this.name,empid).subscribe((res:any)=>{
      console.log("skill added is",res)
    })
    window.location.reload()
    }

  userpreviousproject() {
    this.userservice.prevproject().subscribe((res: any) => {
      if(res.statusCode==200){
        this.filterproj2= res.prevprojects.filter((u:any)=>u.userId==this.filterd[0].id)
        this.previousProject =this.filterproj2
        console.log("res", this.previousProject)
      }
     
  })
  }

  usercurrantproj(){
    this.userservice.fetchallusers().subscribe((res:any)=>{
      console.log("result",res)
      if(res.statusCode==200){

        this.filterproj=res.users.filter((u:any)=>u.id==this.filterd[0].id)
        console.log("users",this.filterproj[0].projects)
        this.currentProject=this.filterproj[0].projects
        
      }
     
    })
  }

  logout() {
    localStorage.removeItem("token")
    this.router.navigate(['/'])
  }

}