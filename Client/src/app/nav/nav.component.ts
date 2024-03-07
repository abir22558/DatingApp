import { Component, OnInit } from '@angular/core';
import { AccountServiceTsService } from '../_services/account.service.ts.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  myForm: FormGroup;
  model : any = {username: '' , password : ''} ;

  constructor(public accountService : AccountServiceTsService , private router: Router, private toaster:ToastrService){

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
      next : () => this.router.navigateByUrl('/members'),
      error : error => this.toaster.error(error.error)
     }
    )};

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }




}
