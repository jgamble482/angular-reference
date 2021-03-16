import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { Pagination } from 'src/app/models/pagination';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  members: Partial<Member[]>
  predicate = 'likedBy'
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination;

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes(){
    this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe(response => {
      this.members = response.content;
      this.pagination = response.pagination;
    });
  }

  pageChanged(event: any){
    this.pageNumber = event.page;
    this.loadLikes();
  }

}
