import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthService } from '../../core/auth.service';
import { SeasonService } from './season.service';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  readonly displayedColumns = ['name', 'created', 'created_by', 'updated', 'updated_by', 'enabled'];
  seasons: Observable<Season[]>;
  newSeason = new FormControl('', [ Validators.required ]);

  constructor(
    public auth: AuthService,
    private seasonService: SeasonService
  ) {}

  ngOnInit() {
    this.seasons = this.seasonService.getData();
  }

  addSeason(user: User) {
    this.seasonService.createSeason(this.newSeason.value, user);
  }

  get error() {
    return this.newSeason.hasError('required') ? 'You must enter a value' : '';
  }
}
