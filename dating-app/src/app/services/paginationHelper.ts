import {PaginationResult} from '../models/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators'

export function getPaginatedResult<T>(params: HttpParams, resource: string, http: HttpClient) {
    const paginatedResult: PaginationResult<T> = new PaginationResult<T>();
    return http.get<T>(`${environment.apiUrl}/${resource}`, { observe: "response", params }).pipe(
      map(respone => {
        paginatedResult.content = respone.body;
        if (respone.headers.get("Pagination") !== null) {
          paginatedResult.pagination = JSON.parse(respone.headers.get("Pagination"));
        }
        return paginatedResult;
      })
    );
  }

  export function getPaginationHeaders(pageNumber: number, pageSize: number): HttpParams{
    let params = new HttpParams();
    params = params.append('pageNumber', `${pageNumber}`);
    params = params.append('pageSize', `${pageSize}`);

    return params
    
  }