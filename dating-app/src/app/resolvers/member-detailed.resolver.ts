import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import {Member} from '../models/member';
import {MemberService} from '../services/member.service';


@Injectable({
    providedIn: 'root'
})
export class MemberDetailResolver implements Resolve<Member>{

    constructor(private memberService: MemberService){

    }

    resolve(route: ActivatedRouteSnapshot): Observable<Member> {
       return this.memberService.getMember(route.paramMap.get('username'));
    }

}