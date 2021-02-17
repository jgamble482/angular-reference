import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {User} from '../../models/user'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() users: User[]
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor() { }

  ngOnInit(): void {
  }

  register(){
    console.log(this.model);
  }

  cancel(){
    console.log('Canceled');
    this.cancelRegister.emit(false);
  }

}
