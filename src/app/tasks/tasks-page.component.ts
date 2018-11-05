import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { AuthService } from '../core/auth.service';
import { TasksService } from './tasks.service';
import { TeamsService } from './teams.service';
import { UserTasksService } from './user-tasks.service';

@Component({
  selector: 'tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit {

  task: FormControl;
  team: FormControl;
  teams$: Observable<Team[]>;
  tasks$: Observable<Task[]>;
  userTasks$: Observable<UserTask[]>;
  memberTasks$: Observable<UserTask[]>;

  teamLead: User;
  user: User;

  teamSaveDisabled = false;

  constructor(
    private auth: AuthService,
    private teamsService: TeamsService,
    private tasksService: TasksService,
    private userTasksService: UserTasksService) { }

  ngOnInit() {
    this.team = new FormControl();
    this.task = new FormControl();

    this.auth.user.subscribe((user: User) => {
      if (!user) {
        return;
      }

      this.user = user;
      if (user.team) {
        this.loadTeamLead(user.team);
        this.userTasks$ = this.userTasksService.getUserTasks(user.uid);
      } else {
        this.loadTeamsSelection();
      }
    });
  }

  teamName(team: Team): string {
    if (!team) {
      return;
    }
    return team.name;
  }

  setTeam() {
    if (!this.user) {
      return this.team.setErrors({ error: 'Unknown User!' });
    }
    const team = <Team>this.team.value;
    if (!team.id) {
      return this.team.setErrors({ error: 'Invalid Team!' });
    }
    this.teamSaveDisabled = true;
    this.teamsService.setUserTeam(this.user.uid, team);
    this.loadTeamLead(team);
  }

  taskSearch() {
    const keyword = this.task.value;
    if (keyword.length < 3) {
      return;
    }

    this.tasks$ = this.tasksService.searchTasks(keyword);
  }

  addUserTask() {
    const task = <Task>this.task.value;
    if (!task.id) {
      return this.task.setErrors({ error: 'Invalid Task!' });
    }

    this.userTasksService.addUserTask(this.user, task);
  }

  taskName(task: Task): string {
    if (!task) {
      return;
    }
    return `${task.name} ( ${task.points} pts. )`;
  }

  get taskError(): string {
    return this.task.errors.error;
  }

  get teamError(): string {
    return this.team.errors.error;
  }

  finishTask(task: UserTask) {
    if (!task) {
      throw new Error('Unable to get user\'s task.');
    }

    this.userTasksService.finishTask(task.id);
  }

  approveTask(task: UserTask) {
    if (!task) {
      throw new Error('Unable to get user\'s task.');
    }

    this.userTasksService.approveTask(task, this.user.team);
  }

  private loadTeamsSelection() {
    this.teamsService.getData().subscribe((teams: Team[]) => {
      this.teams$ = this.team.valueChanges
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
    if (team.lead === this.user.uid) {
      this.memberTasks$ = this.userTasksService.getMemberTasks(team.id);
      this.teamLead = this.user;
    } else {
      this.teamsService.getTeamLead(team).subscribe((lead: User) => {
        this.teamLead = lead;
      });
    }
  }
}
