import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  push(data: any): void {
    throw new Error('Method not implemented.');
  }
 readonly url=environment.baseurl 
  constructor(
    private http:HttpClient,
    private router : Router,
  
  ) { }

  loginUser(LoginData: any,filtered:any){
    
  }
 
  fetchUser(){
    return this.http.get('../../assets/jsonFiles/users.json')
  }
  fetchbooks(){
    return this.http.get('../../assets/jsonFiles/data.json')
  }
  fetchregister(Registred_data:any){
    return this.http.post(this.url+'register',Registred_data)
  }
  fetchlogin(logindata:any){
    return this.http.post(this.url+'login',logindata)
  }
loggedin(){
  return !! localStorage.getItem("Token")
}
projet(){
  return this.http.get(this.url+'projects')
}
prevproject(){
  return this.http.get(this.url+'prevproject')
}
skills(){
  return this.http.get(this.url+'skills')
}
fetchallusers(){
  return this.http.get(this.url+'users')
}
updateproject(updateddata:any){
  return this.http.patch(this.url+'update',updateddata)
}

addproject(adeddata:any){
  return this.http.post(this.url+'add',adeddata)
}

removemember(id:any){
  return this.http.post(this.url+'memberremove',{"id":id})
}

profileupdate(updatedprofie:any){
return this.http.patch(this.url+'profileupdate',updatedprofie)
}

employeeskilldelete(id:any,empid:any){
  return this.http.post(this.url+'skillsdelete',{"id":id,"empid":empid})

}

addskill(name:any,empid:any){



  return this.http.post(this.url+'addskill',{"empid":empid,"name":name})

}

deleteUserPreviousProject(obj: any, projId: any) {

  console.log("obj", obj)

  return this.http.post(this.url + 'delete-previous-project/', { "id": obj, "projId": projId })

}

deleteUserProject(obj: any, projId: any) {

  console.log("obj", obj)

  return this.http.post(this.url + 'delete-project/', { "id": obj, "projId": projId })

}
fetchdropallusers() {
 return this.http.get(this.url + 'dropdown-users')

}


}
