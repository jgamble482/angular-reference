import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import {AccountService} from './services/account.service';
import {User} from './models/user'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dating-app';
  users: User[];

  constructor(private userService: UserService, private accountService: AccountService){}

  ngOnInit(): void{
    this.getUsers();
    this.setCurrentUser();
  }

  getUsers(){
    this.userService.getAll().subscribe(data => {
      this.users = data;
    })
  }

  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }



}
