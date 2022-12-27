import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  fetchVotedList: any;
  fetcheVotedData: any;
  checkData: any;

  constructor() { }
 //  This is for Storing user requested vooks local Storage 
  adduser(user: any){
    let users=[];
    if(localStorage.getItem('Users')){
  users=JSON.parse(localStorage.getItem('Users')as string);
  users=[...users,user]
    }else{
      users=[user]
    }
    localStorage.setItem('Users',JSON.stringify( users))
  }
 //  This is for Storing the Upvote list in Votes local Storage 

  addvote(userUpObj:any){
    let voteusers=[];
    if(localStorage.getItem('Votes')){
      voteusers=JSON.parse(localStorage.getItem('Votes')as string);
      voteusers=[...voteusers,userUpObj]
      console.log("this is array",voteusers)
    }else{
      voteusers=[userUpObj]
    }
    localStorage.setItem('Votes',JSON.stringify(voteusers))
  }

  checkUserVote(link_id:any,user_id:any){

    this.fetchVotedList = localStorage.getItem('Votes');
  
    this.fetcheVotedData = JSON.parse(this.fetchVotedList) ? JSON.parse(this.fetchVotedList) : []
  
    console.log("fetcheVotedData", this.fetcheVotedData)
 
  
    this.checkData  =  this.fetcheVotedData.filter((value:any) => value.link_id == link_id && value.userid == user_id);
  
    return this.checkData ? this.checkData : []
  
  }
}
