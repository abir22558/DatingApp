import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users : any ;
  title = 'Dating App';

  constructor( private http : HttpClient){} ;

  ngOnInit() :void {
   this.http.get('https://localhost:5000/api/users').subscribe({
    next : response => this.users = response ,
    error : error => console.log(error),
    complete :() => console.log('request compleated')
   });
  }

}