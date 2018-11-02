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
  userTasks$: Observable<Task[]>;
  memberTasks$: Observable<Task[]>;

  teamLead: User;
  user: User;

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
    const team = <Team>this.team.value;
    if (!this.user || !team) {
      throw new Error('Unable to get user/team.');
    }

    this.auth.updateUserData(this.user, { team });
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

  finishTask(userTask: UserTask) {
    if (!userTask) {
      throw new Error('Unable to get user\'s task.');
    }

    this.userTasksService.finishTask(userTask.id);
  }

  approveTask(task: Task) {
    if (!this.user || !task) {
      throw new Error('Unable to get user/task.');
    }

    // TODO:
    // this.tasksService.approveUserTask(this.user.uid, task);
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
    this.teamsService.getTeamLead(team).subscribe((lead: User) => {
      this.teamLead = lead;
      if (lead.uid === this.user.uid) {
        this.memberTasks$ = this.userTasksService.getMemberTasks(team.id);
      }
    });
  }
}
