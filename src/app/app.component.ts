import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

  constructor(
    public auth: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {}

  ngOnInit() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
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
