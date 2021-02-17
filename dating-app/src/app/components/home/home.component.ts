import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import{User} from '../../models/user'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode: boolean = false;
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  registerModeToggle(){
    this.registerMode = !this.registerMode;
  }

  getUsers(){
    this.userService.getAll().subscribe(users => {
      this.users = users;
    });
  }

  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }


}
