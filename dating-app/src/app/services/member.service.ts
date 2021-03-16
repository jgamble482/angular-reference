import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take} from 'rxjs/operators';
import {of} from 'rxjs';
import { environment } from 'src/environments/environment';
import {Member} from '../models/member';
import {PaginationResult} from '../models/pagination';
import {UserParams} from '../models/userParams';
import { AccountService } from './account.service';
import { User } from '../models/user';




@Injectable({
  providedIn: 'root'
})
export class MemberService {
  members: Member[] = [];
  memberCache = new Map();
  user: User;
  userParams: UserParams;
  

  constructor(private http: HttpClient, private accountService: AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this.userParams = new UserParams(this.user);
  }

  

  getUserParams(){
    return this.userParams;
  }

  setUserParams(userParams: UserParams){
    this.userParams = userParams;
  }

  resetUserParams(){
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }
  

  getMembers(userParams: UserParams){
    var response = this.memberCache.get(Object.values(userParams).join('-'));
    if(response) return of(response);
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append("orderBy", userParams.orderBy);

    return this.getPaginatedResult<Member[]>(params, 'user').pipe(map(response =>{
      this.memberCache.set(Object.values(userParams).join('-'), response);
      return response;
    }))
  }

  private getPaginatedResult<T>(params: HttpParams, resource: string) {
    const paginatedResult: PaginationResult<T> = new PaginationResult<T>();
    return this.http.get<T>(`${environment.apiUrl}/${resource}`, { observe: "response", params }).pipe(
      map(respone => {
        paginatedResult.content = respone.body;
        if (respone.headers.get("Pagination") !== null) {
          paginatedResult.pagination = JSON.parse(respone.headers.get("Pagination"));
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number): HttpParams{
    let params = new HttpParams();
    params = params.append('pageNumber', `${pageNumber}`);
    params = params.append('pageSize', `${pageSize}`);

    return params
    
  }

  getMember(username: string){
   const member = [...this.memberCache.values()]
    .reduce((arr, elem) => arr.concat(elem), [])
    .find((member: Member) => member.username === username);
    if(member) return of(member);
    return this.http.get<Member>(`${environment.apiUrl}/user/${username}`);
  }

  updateMember(updatedMember: Member){
    return this.http.put(`${environment.apiUrl}/user`, updatedMember).pipe(map(() => {
      let index = this.members.indexOf(updatedMember);
      this.members[index] = updatedMember;
    }));
  }

  setMainPhoto(photoId: number){
    return this.http.put(`${environment.apiUrl}/user/set-main-photo/${photoId}`, {});
  }

  deletePhoto(photoId: number){
    return this.http.delete(`${environment.apiUrl}/user/delete-photo/${photoId}`);
  }

  addLike(username: string){
    return this.http.post(`${environment.apiUrl}/likes/${username}`, {});
  }
  getLikes(predicate: string, pageNumber: number, pageSize: number){
    let params = this.getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    return this.getPaginatedResult<Partial<Member[]>>(params, 'likes');
  }
}
