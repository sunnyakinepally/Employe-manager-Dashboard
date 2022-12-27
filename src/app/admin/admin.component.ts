import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

 public userlist:any;
 public booklist:any;
 public reqbook:any=[];
 form!: FormGroup;
 user:any={};
 randnumber:any;
  id:  any; 
  constructor(private userService:UserService, private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.getusers();
    this.getbooks();
      this.getreqbooks();
 
      this.form=new FormGroup({
        linkname:new FormControl( "",),
        linkurl:new FormControl(""),
        upcount:new FormControl(0),
        downcount:new FormControl(0)
    });
    this.Number();
     
  }
//   createuserform(){
//     this.form=this.fb.group({
//       linkname:[null,Validators.required],
//       linkurl:[null,Validators.required],
//       count:[null]
//     })
//  }
 Number(){
    this.randnumber=Math.floor(Math.random() * 999) + 100;
    console.log(this.randnumber)
 }

 onsubmit(){
 
  this.id={'link_id':this.randnumber}
  this.user=Object.assign(this.user,this.form.value,this.id);
  console.log('input details',this.user)
  
 this.linkuser(this.user)
 this.form.reset();
 this.router.navigate(['/admin'])
window.location.reload();

}

linkuser(user: any){
  let Links=[];
  if(localStorage.getItem('Links')){
    Links=JSON.parse(localStorage.getItem('Links')as string);
    Links=[...Links,user]
  }else{
    Links=[user]
  }
  localStorage.setItem('Links',JSON.stringify( Links))
}

getusers(){
  this.userService.fetchUser().subscribe((res:any)=>{
    this.userlist=res.users
    console.log(this.userlist)

  })
}
getbooks(){
  this.userService.fetchbooks().subscribe((res:any)=>{
    this.booklist=res.books
    console.log(this.booklist)

  })
}
getreqbooks(){
  
  this.reqbook= JSON.parse(localStorage.getItem('Users')as string)
 console.log(this.reqbook)

}
// dle(value:any,index: any){
// console.log('selected value',value)
// this.reqbook.splice(index,1)

// localStorage.setItem('Users',JSON.stringify( this.reqbook))
// // console.log(this.reqbook)

// }


add(value:any,index: any){
// console.log('selected value',value)
this.user={"bookname":value}
console.log(this.user)
  this.adduser(this.user)
  this.reqbook.splice(index,1)

localStorage.setItem('Users',JSON.stringify( this.reqbook))

}
adduser(user: any){
  let users=[];
  if(localStorage.getItem('Allocated')){
users=JSON.parse(localStorage.getItem('Allocated')as string);
users=[...users,user]
  }else{
    users=[user]
  }
  localStorage.setItem('Allocated',JSON.stringify( users))
}
logout(){

  localStorage.removeItem("LoginData")



  this.router.navigate(['/'])

}

}

