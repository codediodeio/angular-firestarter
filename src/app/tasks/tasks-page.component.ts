import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap, startWith, withLatestFrom } from 'rxjs/operators';

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
  tasks$: Observable<Task[]>;
  tasksDone: Task[];
  private tasksDone$: Observable<TaskDone[]>;

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
        this.tasksDone$ = this.tasksService.getTasksDone(user.uid);
        this.tasks$ = this.tasksService.getAllTasks().pipe(
          withLatestFrom(this.tasksDone$),
          map(ref => {
            const tasks = ref[0];
            const tasksDone = ref[1].map(taskDone => taskDone.task.id);
            this.tasksDone = ref[1].map(taskDone => ({
              ...taskDone.task,
              status: taskDone.status
            }));
            return tasks.filter((task: Task) => {
              return tasksDone.indexOf(task.id) < 0;
            });
          })
        );
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

  finishTask(task: Task) {
    if (!this.user || !task) {
      throw new Error('Unable to get both user and task.');
    }

    this.tasksService.finishTask(this.user.uid, task);
  }

  approveTask(task: Task) {
    if (!this.user || !task) {
      throw new Error('Unable to get both user and task.');
    }

    // TODO:
    // this.tasksService.approveTask(this.user.uid, task);
  }
}
