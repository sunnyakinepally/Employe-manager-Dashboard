import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { LinkService } from '../link.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  bookname: string = '';
  public booklist:any;
  fetchbookList: any;
userform!: FormGroup;
user:any={};
  aloocatedbook: any;
  links:any=[];

  fetchedLink: any;
  filteredLink: any;
  userid: any;
  UserVotedLInks: any=[];
voteddata:any=[];
  person: any;
  fetchedperson: any;
  filterdperson: any;
  fetchVotedList: any;
  fetcheVotedData: any;
  checkData: any;
  checkVote: any;
  user_id: any;
  removed: any;
  linkarray: any=[];
 
  p: number = 1;
    collection: any=[];  


  constructor(private userService:UserService, private fb:FormBuilder,private linkservice:LinkService,private router:Router) { }

  ngOnInit(): void {
  
    this.getbooks();
   this.createuserform();
   this.getaloocatedbook();
   this.getlink();
   
  
  }
getbooks(){
  this.userService.fetchbooks().subscribe((res:any)=>{
    this.booklist=res.books
    // console.log(this.booklist)

  })
}
createuserform(){
   this.userform=this.fb.group({
    bookname:[null,Validators.required]
  
   })
}




dle(value:any,index: any){
  // console.log('selected value',value)
this.user={"bookname":value}
console.log(this.user)
  this.linkservice.adduser(this.user)
  // localStorage.setItem('Users',JSON.stringify( this.reqbook))
  // console.log(this.reqbook)
  
  }


getaloocatedbook(){
  
  this.aloocatedbook= JSON.parse(localStorage.getItem('Allocated')as string)
//  console.log(this.aloocatedbook)

}

getlink(){
  this.links=JSON.parse(localStorage.getItem('Links')as string)
  this.person=JSON.parse(localStorage.getItem('filtered')as string)
  // this.dlelink=JSON.parse(localStorage.getItem('Links')as string)
}

upVote(id:any){
  this.checkVote = this.linkservice.checkUserVote(id, this.user_id)

  if (this.checkVote.length > 0) {

    if (this.checkVote[0].upVote == 1) {

     alert("already Voted")

    } else {

      this.updateExistedUpVote(id);
    }

  } else {

    this.voteLink(id)

  }

}
downVoteCheck(id: any) {
  this.checkVote = this.linkservice.checkUserVote(id, this.user_id)
  if (this.checkVote.length > 0) {
    if (this.checkVote[0].downVote == 1) {
      alert("Already Voted")
      // this.updisable = false
      // this.downdisable = true
    } else {
      this.updateExistedVote(id);
    }
  } else {
    this.downVote(id)
  }
}
  voteLink(id:any){
  this.fetchedLink =this.links
this.fetchedperson=this.person

// console.log(this.fetchedLink)
  this.filteredLink  =  this.fetchedLink.filter((value:any) => value.link_id == id, );
this.filterdperson=this.fetchedperson.filter((value:any)=>value.user_id==this.userid)

// console.log(this.filteredLink)
  let previousCount = this.filteredLink[0].upcount
// console.log(previousCount)
  let updatedCount = previousCount + 1

   console.log("updated Count",updatedCount)



  for (var data in this.fetchedLink ) {

    if (this.fetchedLink[data].link_id == id) {

      this.fetchedLink[data].upcount = updatedCount;

       break;

    }

  }

  localStorage.setItem("Links", JSON.stringify(this.fetchedLink));

 

  console.log(" this.filteredLink ", this.filteredLink )

  let userUpObj = {

    link_id:id,

    user_id:this.fetchedperson[0].user_id,
    upVote:1,
 downVote:0

  }

  this.voteddata.push(userUpObj)


  console.log("voteddata",this.voteddata)

  this.linkservice.addvote(userUpObj)

 }
 downVote(id:any){
  this.fetchedLink =this.links
this.fetchedperson=this.person

// console.log(this.fetchedLink)
  this.filteredLink  =  this.fetchedLink.filter((value:any) => value.link_id == id, );
this.filterdperson=this.fetchedperson.filter((value:any)=>value.user_id==this.userid)

// console.log(this.filteredLink)
  let previousCount = this.filteredLink[0].downcount
// console.log(previousCount)
  let updatedCount = previousCount + 1

   console.log("updated Count",updatedCount)



  for (var data in this.fetchedLink ) {

    if (this.fetchedLink[data].link_id == id) {

      this.fetchedLink[data].downcount = updatedCount;

       break;

    }

  }

  localStorage.setItem("Links", JSON.stringify(this.fetchedLink));

 

  console.log(" this.filteredLink ", this.filteredLink )

  let userUpObj = {

    link_id:id,

    user_id:this.fetchedperson[0].user_id,
    upVote:0,
 downVote:1

  }

  this.voteddata.push(userUpObj)


  console.log("voteddata",this.voteddata)

  this.linkservice.addvote(userUpObj)

 }

updateExistedUpVote(id:any) {
  const fetchAllVotes = this.linkservice.fetcheVotedData
  console.log("this.checkVote", fetchAllVotes)
  for (var i in fetchAllVotes) {
    if (fetchAllVotes[i].link_id == id && fetchAllVotes[i].userId == this.user_id) {
      fetchAllVotes[i].downVote = 0;
      fetchAllVotes[i].upVote = 1;
      // break; //Stop this loop, we found it!
    }
    this.UserVotedLInks.push(fetchAllVotes[i])
    console.log("this.UserVotedLInks", this.UserVotedLInks)
  }
  this.fetchedLink = this.links
  this.filteredLink = this.fetchedLink.filter((value: any) => value.link_id == id);
  let previousCount = this.filteredLink[0].upcount
  let updatedCount = previousCount + 1
  //  console.log("updated Count",updatedCount)
  for (var i in this.fetchedLink) {
    if (this.fetchedLink[i].link_id == id) {
      this.fetchedLink[i].upcount = updatedCount;
      break; //Stop this loop, we found it!
    }
  }
  localStorage.setItem("Links", JSON.stringify(this.fetchedLink));
  localStorage.setItem("Votes", JSON.stringify(this.UserVotedLInks));
  // this.router.navigateByUrl('/employee')
  window.location.reload()
}

updateExistedVote(id:any) {
  const fetchAllVotes = this.linkservice.fetcheVotedData
  console.log("this.checkVote", fetchAllVotes)
  for (var i in fetchAllVotes) {
    if (fetchAllVotes[i].link_id == id && fetchAllVotes[i].userId == this.user_id) {
      fetchAllVotes[i].downVote = 1;
      fetchAllVotes[i].upVote = 0;
      // break; //Stop this loop, we found it!
    }
    this.UserVotedLInks.push(fetchAllVotes[i])
    console.log("this.UserVotedLInks", this.UserVotedLInks)
  }
  this.fetchedLink = this.links;
  this.filteredLink = this.fetchedLink.filter((value: any) => value.link_id == id);
  let previousCount = this.filteredLink[0].upcount
  let updatedCount = previousCount - 1
   console.log("updated Count",updatedCount)
  for (var i in this.fetchedLink) {
    if (this.fetchedLink[i].link_id == id) {
      this.fetchedLink[i].upcount = updatedCount;
      break; //Stop this loop, we found it!
    }
  }
  localStorage.setItem("Links", JSON.stringify(this.fetchedLink));
  localStorage.setItem("Votes", JSON.stringify(this.UserVotedLInks));
  // this.router.navigateByUrl('/employee')
  window.location.reload()
}

deleting(id: any){
  const findIndex = this.links.findIndex((a: any) => a.link_id === id)
console.log(findIndex)
      
      this.links.splice(findIndex , 1)


      const fetchAllVotes = this.linkservice.fetcheVotedData

      const findvotedIndex = fetchAllVotes.findIndex((a: any) => a.link_id === id)

      fetchAllVotes.splice(findvotedIndex , 1)



      localStorage.setItem("Links", JSON.stringify(this.links));

      localStorage.setItem("Votes", JSON.stringify(fetchAllVotes));
  
  }

  logout(){

   
  
    localStorage.removeItem("filtered")
  
    this.router.navigate(['/'])
  
  }
}



