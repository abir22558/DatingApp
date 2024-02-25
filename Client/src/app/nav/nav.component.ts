import { Component, OnInit } from '@angular/core';
import { AccountServiceTsService } from '../_services/account.service.ts.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  myForm: FormGroup;
  model : any = {username: '' , password : ''} ;

  constructor(public accountService : AccountServiceTsService){

    this.myForm = new FormGroup({
      'username': new FormControl(''),
      'password': new FormControl(''),
    });

  }

  ngOnInit(): void {
  }
  

  login(){
    this.accountService.login(this.myForm.value).subscribe(
     {
      next : response=>{
        console.log(response);
      },
      error : error => console.log(error)
     }
    )};

  logout(){
    this.accountService.logout();
  }




}
