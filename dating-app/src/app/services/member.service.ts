import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {of} from 'rxjs';
import { environment } from 'src/environments/environment';
import {Member} from '../models/member';
import {PaginationResult} from '../models/pagination';
import {UserParams} from '../models/userParams';




@Injectable({
  providedIn: 'root'
})
export class MemberService {
  members: Member[] = [];
  

  constructor(private http: HttpClient) { }

  getMembers(userParams: UserParams){
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);

    return this.getPaginatedResult<Member[]>(params)
  }

  private getPaginatedResult<T>(params: HttpParams) {
    const paginatedResult: PaginationResult<T> = new PaginationResult<T>();
    return this.http.get<T>(`${environment.apiUrl}/user`, { observe: "response", params }).pipe(
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

  setMainPhoto(photoId: number){
    return this.http.put(`${environment.apiUrl}/user/set-main-photo/${photoId}`, {});
  }

  deletePhoto(photoId: number){
    return this.http.delete(`${environment.apiUrl}/user/delete-photo/${photoId}`);
  }
}
