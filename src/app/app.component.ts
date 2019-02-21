import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { AuthService } from './core/auth.service';
import { NotifyService } from './core/notify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;

  constructor(
    public auth: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private notify: NotifyService,
    private updates: SwUpdate
  ) {}

  ngOnInit() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);

    // Notify & reload when updates occurs
    this.updates.available.subscribe(event => {
      const message = 'A new version of this App is available. Browser will reload for a moment to get the latest version.';
      this.notify.update(message, 'info');
      this.updates.activateUpdate().then(() => document.location.reload());
    });
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  get mode(): string {
    return this.mobileQuery.matches ? 'over' : 'side';
  }

  logout() {
    this.auth.signOut();
  }
}
