import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MsalService} from '@azure/msal-angular';
import { Observable, from, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  readonly url = 'https://graph.microsoft.com/v1.0/me/sendMail';
  readonly scopes = ['user.read', 'mail.send'];

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private msalService: MsalService
  ) {}

  private getToken(): Observable<string> {
    const cache = this.msalService.getCachedTokenInternal(this.scopes);
    if (cache && cache.token) {
      return of(cache.token);
    }

    return from(this.msalService.acquireTokenSilent(this.scopes));
  }

  sendEmail(emailAddress: string, subject: string, content: string, contentType: 'Text' | 'HTML' = 'Text') {
    const body = {
      message: {
        subject,
        body: {
          contentType,
          content
        },
        toRecipients: [
          {
            emailAddress: {
              address: emailAddress
            }
          }
        ]
      },
      saveToSentItems: false
    };
    
    return this.getToken().pipe(
      flatMap((token: string) => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.post(this.url, body, { headers });
      })
    );
  }
}
