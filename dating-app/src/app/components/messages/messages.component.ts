import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/models/pagination';
import {Message} from '../../models/message';
import {MessageService} from '../../services/message.service'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  container: string = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(){
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container)
      .subscribe(response =>{
        this.messages = response.content;
        this.pagination = response.pagination;
      })
  }

  pageChanged(event: any){
    this.pageNumber = event.page;
    this.loadMessages();
  }


}
