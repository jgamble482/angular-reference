import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment'

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {
  validationErrors: string[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error(){
    this.http.get(`${environment.apiUrl}/error/not-found`)
      .subscribe(response => 
        {
          console.log(response);
        }, error => 
        {
          console.log(error);
        });
        
      
  }

  get400ValidationError(){
    this.http.post(`${environment.apiUrl}/account/register`, {})
      .subscribe(response =>
        { 
        console.log(response);
        }, error => 
        {
          console.log(error);
          this.validationErrors = error;
        });
      
  }

  get400Error(){
    this.http.get(`${environment.apiUrl}/error/bad-request`)
      .subscribe(response => 
        {
        console.log(response)
        }, error => 
        {
          console.log(error)
        });
  }

  get500Error(){
    this.http.get(`${environment.apiUrl}/error/server-error`)
      .subscribe(response => console.log(response), error => console.log(error));
      
  }

  get401Error(){
    this.http.get(`${environment.apiUrl}/error/auth`)
      .subscribe(response => console.log(response), error => console.log(error));
      
  }


}
