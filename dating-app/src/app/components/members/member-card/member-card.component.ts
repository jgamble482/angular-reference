import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';
import { PresenceService } from 'src/app/services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member;

  constructor(private memberService: MemberService, private toastrService: ToastrService, public presence: PresenceService) { }

  ngOnInit(): void {
  }
  addLike(){
    this.memberService.addLike(this.member.username).subscribe(() => this.toastrService.success(`You have liked ${this.member.knownAs}`));
  }



}
