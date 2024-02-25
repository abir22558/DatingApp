import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  registerMode = false ; 
  users : any ;
  
constructor(){}

  ngOnInit(): void {
  }
  
  registerToggler(){
    this.registerMode= true ;
  }
  cancelRegestrationMode(event : boolean){
   this.registerMode = event ;
  }
}
