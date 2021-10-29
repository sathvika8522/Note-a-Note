import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AngExprService {
 
  userloginstatus=false;
  
  constructor(private hc:HttpClient) { }
  
  //on registering we are submmiting the user data to database :)
  createuser(credentials):Observable<any>
  {
      return this.hc.post("/users/createusers",credentials)
  }

  //on login checking whether details are valid or not
  onlogin(credentials):Observable<any>
  {
    return this.hc.post("/users/login",credentials)
  }

  //creating notes i.e storing notes in database given by user
  createNotes(notesObj):Observable<any>
  {
    return this.hc.post("/userNotes/createNote",notesObj)
  }

  //get notes of the user
  getNotesfun(username):Observable<any>
  {
    return this.hc.get(`/userNotes/getNotes/${username}`)
  }

  //update notes based on title and username
  updateNotes(obj):Observable<any>
  {
    let title=obj.title
    return this.hc.delete(`/userNotes/updateNote/${title}`,obj)
  } 

  //delete notes of user by title
  deleteNotes(obj):Observable<any>
  {
    let title=obj.title
    let un=obj.username
    return this.hc.delete(`/userNotes/deleteNote/${un}/${title}`)
  }
}
