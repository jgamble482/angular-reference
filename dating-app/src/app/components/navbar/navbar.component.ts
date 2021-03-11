import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user'
import { Observable } from 'rxjs';
import {AccountService} from '../../services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  model: any = {};
 

  constructor(public accountService: AccountService, private router: Router, private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.model).subscribe(response => 
      {
      console.log(response);
      this.router.navigateByUrl('/members');
      });
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');

  }



}
