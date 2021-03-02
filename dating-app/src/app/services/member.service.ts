import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {of} from 'rxjs';
import { environment } from 'src/environments/environment';
import {Member} from '../models/member';




@Injectable({
  providedIn: 'root'
})
export class MemberService {
  members: Member[] = [];

  constructor(private http: HttpClient) { }

  getAll(){
    if(this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(`${environment.apiUrl}/user`).pipe(map(members =>{
      this.members = members;
      return this.members
    }));
  }

  getMember(username: string){
    let member = this.members.find(x => x.username === username);
    if(member !== undefined) return of(member);
    return this.http.get<Member>(`${environment.apiUrl}/user/${username}`);
  }

  updateMember(updatedMember: Member){
    return this.http.put(`${environment.apiUrl}/user`, updatedMember).pipe(map(() => {
      let index = this.members.indexOf(updatedMember);
      this.members[index] = updatedMember;
    }));
  }
}
