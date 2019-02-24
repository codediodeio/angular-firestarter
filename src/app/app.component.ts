import { MediaMatcher } from '@angular/cdk/layout';
import {
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval, from } from 'rxjs';
import { first, flatMap } from 'rxjs/operators';

import { AuthService } from './core/auth.service';
import { NotifyService } from './core/notify.service';
import { environment } from '../environments/environment';

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
    private appRef: ApplicationRef,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private notify: NotifyService,
    private updates: SwUpdate
  ) {}

  ngOnInit() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);

    if (!environment.production) {
      return;
    }

    // Check for App Updates every 15mins
    const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
    const interval15Mins$ = interval(15 * 60 * 1000);
    concat(appIsStable$, interval15Mins$).subscribe(() => this.updates.checkForUpdate());

    // Notify & reload when updates occurs
    this.updates.available.subscribe(event => {
      const message = 'A new version of this App is available. App needs to reload.';
      this.notify.update(message, 'info').pipe(
        flatMap(() => from(this.updates.activateUpdate()))
      ).subscribe(() => location.reload());
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
