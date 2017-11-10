import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/// Notify users about errors and other helpful stuff

export interface Msg {
  content: string;
  style: string;
}

@Injectable()
export class NotifyService {

  private _msgSource = new Subject<Msg>();

  msg = this._msgSource.asObservable();

  constructor() { }


  update(content: string, style: string) {
    const msg: Msg = { content, style }
    this._msgSource.next(msg)
  }

  clear() {
    this._msgSource.next(null)
  }

}
