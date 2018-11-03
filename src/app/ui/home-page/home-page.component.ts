import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LeaderboardService } from './leaderboard.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  topUsers$: Observable<User[]>;

  constructor(private leaderboardService: LeaderboardService) { }

  ngOnInit() {
    this.topUsers$ = this.leaderboardService.getTopUsers();
  }

}
