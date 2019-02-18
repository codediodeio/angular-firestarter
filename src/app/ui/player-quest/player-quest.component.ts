import { Component, OnInit } from '@angular/core';
import { PlayerQuestService } from './player-quest.service';

@Component({
  selector: 'player-quest',
  templateUrl: './player-quest.component.html',
  styleUrls: ['./player-quest.component.scss']
})
export class PlayerQuestComponent implements OnInit {

  constructor(private playerQuestService: PlayerQuestService) {}

  ngOnInit() {
  }
}
