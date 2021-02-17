import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  model: any = {};
  loggedIn: boolean;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.model);
    
    this.accountService.login(this.model).subscribe(response => console.log(response));

    this.loggedIn = true;

  }

  logout(){
    this.loggedIn = false;
    this.accountService.logout();
  }

  getCurrentUser(){
    this.accountService.currentUser$.subscribe(user =>{
      this.loggedIn = !!user;
    })
  }

}
