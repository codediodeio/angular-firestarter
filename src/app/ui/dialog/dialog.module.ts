import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddQuestDialogComponent } from './add-quest-dialog/add-quest-dialog.component';

import { 
  MatCardModule, 
  MatIconModule, 
  MatGridListModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatButtonModule,
  MatSelectModule,
  MatButtonToggleModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    MatButtonToggleModule,
    FormsModule
  ],
  declarations: [ AddQuestDialogComponent ],
  entryComponents: [ AddQuestDialogComponent ]
})
export class DialogModule { }
