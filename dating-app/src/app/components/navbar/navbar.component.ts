import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user'
import { Observable } from 'rxjs';
import {AccountService} from '../../services/account.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  model: any = {};
 

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.model);
    this.accountService.login(this.model).subscribe(response => console.log(response));
  }

  logout(){
    this.accountService.logout();
  }



}
