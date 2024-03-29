import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceTsService {
basseUrl = "https://localhost:5001/api";
private currentUserSource = new BehaviorSubject<User | null>(null);
currentUser$ = this.currentUserSource.asObservable();

  constructor(private http : HttpClient) { }

  login(model : any) {
   return this.http.post<User>(this.basseUrl+"/account/login",model)
   .pipe(
    map(
      (response:User) => {
        const user = response ;
        localStorage.setItem("user",JSON.stringify(user));
        this.currentUserSource.next(user);
      }
    )
   )
  }

  
  register(model : any) {
    return this.http.post<User>(this.basseUrl+"/account/register",model)
    .pipe(
     map(user => {if(user){
      console.log(user);
      localStorage.setItem("user",JSON.stringify(user));
      this.currentUserSource.next(user);
     }} 
     )
    )
   }

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }
  
  logout() {
   localStorage.removeItem("user");
   this.currentUserSource.next(null);
  }
}
