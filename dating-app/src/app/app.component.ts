import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import {AccountService} from './services/account.service';
import {PresenceService} from './services/presence.service';
import {User} from './models/user'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dating-app';
  users: User[];

  constructor(private accountService: AccountService, private presence: PresenceService){}

  ngOnInit(): void{
    this.setCurrentUser();
  }

  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
    this.presence.createHubConnection(user);
  }



}
