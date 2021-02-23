import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Member} from '../models/member';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
  })
}

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Member[]>(`${environment.apiUrl}/user`, httpOptions);
  }

  getMember(username: string){
    return this.http.get<Member[]>(`${environment.apiUrl}/user/${username}`, httpOptions);
  }
}
