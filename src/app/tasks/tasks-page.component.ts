import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap, startWith } from 'rxjs/operators';

import { AuthService } from '../core/auth.service';
import { TasksService } from './tasks.service';
import { TeamsService } from './teams.service';

@Component({
  selector: 'tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit {

  teamFormGroup: FormGroup;
  filteredTeams: Observable<Team[]>;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private teamsService: TeamsService,
    private tasksService: TasksService) { }

  teamLead: User;
  user: User;
  tasks: Observable<Task[]>;

  ngOnInit() {
    this.teamFormGroup = this.formBuilder.group({
      team: ['', Validators.required]
    });

    this.auth.user.subscribe((user: User) => {
      if (!user) {
        return;
      }

      this.user = user;
      if (user.team) {
        this.loadTeamLead(user.team);
        this.tasks = this.tasksService.getData();
      } else {
        this.loadTeamsSelection();
      }
    });
  }

  private loadTeamsSelection() {
    this.teamsService.getData().subscribe((teams: Team[]) => {
      this.filteredTeams = this.teamFormGroup.controls.team.valueChanges
        .pipe(
          startWith<string | Team>(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this.filterTeams(teams, name) : teams)
        );
    });
  }

  private filterTeams(teams: Team[], name: string): Team[] {
    const filterValue = name.toLowerCase();
    return teams.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private loadTeamLead(team: Team) {
    this.teamsService.getTeamLead(team).subscribe((lead: User) => {
      this.teamLead = lead;
    });
  }

  displayTeamName(team: Team): string {
    return team.name;
  }

  setUserTeam(user: User) {
    const team = <Team>this.teamFormGroup.controls.team.value;
    this.auth.updateUserData(user, { team });
    this.loadTeamLead(team);
  }

  finishTask() {
    // TODO
  }
}
