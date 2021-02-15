import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import {User} from './models/user'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'dating-app';
  users: User[];

  constructor(private userService: UserService){
   this.userService.getAll().subscribe(data => {
     this.users = data
   });
    
  }



}
