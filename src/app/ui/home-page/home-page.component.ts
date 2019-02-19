import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { LeaderboardService } from './leaderboard.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  topUsers$: Observable<UserScore[]>;

  constructor(private leaderboardService: LeaderboardService) { }

  ngOnInit() {
    this.topUsers$ = of([]); // this.leaderboardService.getTopUsers();
  }

}
