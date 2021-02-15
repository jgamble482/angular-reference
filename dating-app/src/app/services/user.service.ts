import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {User} from '../models/user'
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]>{
    return this.http.get<User[]>(`${environment.apiUrl}/User`);
  }
}
