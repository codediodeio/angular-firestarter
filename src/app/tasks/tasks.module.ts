import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';

import { TasksPageComponent } from './tasks-page.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TasksService } from './tasks.service';
import { UserTasksService } from './user-tasks.service';
import { TeamsService } from './teams.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TaskListComponent,
    TasksPageComponent,
  ],
  providers: [
    TasksService,
    TeamsService,
    UserTasksService,
  ]
})
export class TasksModule { }
