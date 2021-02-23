import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Member} from '../models/member';




@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Member[]>(`${environment.apiUrl}/user`);
  }

  getMember(username: string){
    return this.http.get<Member[]>(`${environment.apiUrl}/user/${username}`);
  }
}
