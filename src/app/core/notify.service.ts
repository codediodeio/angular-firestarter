import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/message';

import { Injectable } from '@angular/core';


/// Notify users about errors and other helpful stuff
export interface Msg {
  content: string;
  style: string;
}

@Injectable()
export class NotifyService {

  /**
   *
   */
  constructor(public messageService: MessageService) {


  }


  update(content: string, style: 'error' | 'info' | 'success') {

    this.add({ severity: style, summary: style + ' ', detail: content });

    console.log("Notification  update:" + content);
  }



  clear() {
    this.clearToast();
  }


  //@feature Toasting Service

  add(msg: Message,life: number=4200) {
   if (!msg.life) msg.life=life;
    this.messageService.add(msg);
  }
  clearToast() {
    this.messageService.clear();
  }
  //

  //@feature Toasting service

  onConfirm() {
    this.messageService.clear('');
  }

  onReject() {
    this.messageService.clear('');
  }


}
