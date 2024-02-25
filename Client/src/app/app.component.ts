import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AccountServiceTsService } from './_services/account.service.ts.service';
import { User } from './_models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users : any ;
  title = 'Dating App';

  constructor( private http : HttpClient, private accountService : AccountServiceTsService){ console.log("on init constructor");} ;

  ngOnInit() :void {
    console.log("on init app component");
    this.getUser() ;
    this.setCurrentUser();
  }
  setCurrentUser(){
   const currentUser = localStorage.getItem("user") ;
   if(currentUser == null ) return;
   this.accountService.setCurrentUser(JSON.parse(currentUser));
  }

  getUser() {
    this.http.get('https://localhost:5001/api/users').subscribe({
    next : response => this.users = response ,
    error : error => console.log(error),
    complete :() => console.log('request compleated')
   });
  }

}
