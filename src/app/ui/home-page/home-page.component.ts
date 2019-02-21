import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { LeaderboardService } from './leaderboard.service';
import { SeasonService } from '../../core/season.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  topUsers$: Observable<UserScore[]>;
  season$: Observable<Season>;

  constructor(
    private leaderboard: LeaderboardService,
    private season: SeasonService) { }

  ngOnInit() {
    this.topUsers$ = of([]); // this.leaderboard.getTopUsers();
    this.season$ = this.season.getEnabledSeason();
  }

}
