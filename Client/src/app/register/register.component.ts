import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountServiceTsService } from '../_services/account.service.ts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  RegisterForm :  FormGroup ;
  @Output() registerModeHomePage = new EventEmitter<boolean>(); 
  
  constructor(private accountService : AccountServiceTsService, private toaster:ToastrService ){

    this.RegisterForm = new FormGroup ({
        'username': new FormControl(''),
        'password': new FormControl(''),
    })

  }
  ngOnInit(): void {
  }

  register(){
    return this.accountService.register(this.RegisterForm.value).subscribe({
      next : () => {
        this.cancel();
      },
      error : error => this.toaster.error(error.error)
    });
  }

  cancel(){
    this.registerModeHomePage.emit(false) ;
  }

}
