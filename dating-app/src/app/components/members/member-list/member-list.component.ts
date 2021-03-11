import { Component, OnInit } from '@angular/core';
import {MemberService} from '../../../services/member.service';
import {Member} from '../../../models/member';
import {Observable} from 'rxjs';
import { Pagination } from 'src/app/models/pagination';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/user';
import { take } from 'rxjs/operators';
import { UserParams } from 'src/app/models/userParams';
@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members:Member[];
  pagination: Pagination;
  userParams: UserParams;
  user: User;
  genderList = [{value:'male', display: 'Males'}, {value: 'female', display: 'Females'}];
 

  constructor(private memberService: MemberService, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this.userParams = new UserParams(this.user);
   }

  ngOnInit(): void {
   this.loadMembers()
  }

  loadMembers(): void{
    this.memberService.getMembers(this.userParams).subscribe(response =>{
      this.members = response.content;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event: any){
    this.userParams.pageNumber = event.page;
    this.loadMembers();
  }

  resetFilters(){
    this.userParams = new UserParams(this.user);
    this.loadMembers();
  }



}
