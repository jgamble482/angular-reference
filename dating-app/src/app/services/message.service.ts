import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {getPaginationHeaders, getPaginatedResult} from './paginationHelper';
import {environment} from '../../environments/environment';
import {Message} from '../models/message'
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  hubUrl: string = environment.hubUrl;
  private hubConnection: HubConnection;
  private messageThreadSource: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
  messageThread$ = this.messageThreadSource.asObservable();

  constructor(private http: HttpClient) { }

  createHubConnection(user: User, otherUsername: string) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.hubUrl}/message?user=${otherUsername}`, {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build()

      this.hubConnection.start()
        .catch(error => console.log("Message Hub Connection Error: ", error));
      
      this.hubConnection.on('ReceiveMessageThread' , messages => {
        this.messageThreadSource.next(messages);
      })

      this.hubConnection.on('NewMessage', message => {
        this.messageThread$.pipe(take(1)).subscribe(messages => {
          this.messageThreadSource.next([...messages, message])
        })
      })
  }

  stopHubConnnection() {
    this.hubConnection.stop();
  }

  getMessages(pageNumber, pageSize, container){
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);
    return getPaginatedResult<Message[]>(params, 'messages', this.http)
  }

  getMessageThread(username: string, ){
    return this.http.get<Message[]>(`${environment.apiUrl}/messages/thread/${username}`);
  }

  async sendMessage(username: string, content: string){
    return this.hubConnection.invoke('SendMessage', {recipientUsername: username, content})
    .catch(error => console.log("Message Send Error: ", error));
  }

  deleteMessage(messageId: number){
    return this.http.delete(`${environment.apiUrl}/messages/${messageId}`);
  }
}
