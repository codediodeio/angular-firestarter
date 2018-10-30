import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';

import { TasksPageComponent } from './tasks-page.component';
import { TasksService } from './tasks.service';
import { TeamsService } from './teams.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  declarations: [ TasksPageComponent ],
  providers: [
    TasksService,
    TeamsService
  ]
})
export class TasksModule { }
