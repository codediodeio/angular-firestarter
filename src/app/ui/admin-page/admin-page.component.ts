import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthService } from '../../core/auth.service';
import { SeasonService } from '../../core/season.service';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  readonly displayedColumns = [
    'name',
    'created',
    'created_by',
    'updated',
    'updated_by',
    'enabled',
    'action',
  ];

  seasons: Observable<Season[]>;
  newSeason = new FormControl('', [ Validators.required ]);
  loading = false;

  constructor(
    public auth: AuthService,
    private seasonService: SeasonService
  ) {}

  ngOnInit() {
    this.seasons = this.seasonService.getData();
  }

  addSeason(user: User) {
    this.seasonService.createSeason(this.newSeason.value, {
      uid: user.uid,
      displayName: user.displayName
    });
  }

  enable(season: Season, user: User) {
    const userInfo = {
      uid: user.uid,
      displayName: user.displayName
    };

    this.loading = true;
    this.seasonService.enableSeason(season.id, userInfo).subscribe(() => {
      this.loading = false;
    });
  }

  get error() {
    return this.newSeason.hasError('required') ? 'You must enter a value' : '';
  }
}
