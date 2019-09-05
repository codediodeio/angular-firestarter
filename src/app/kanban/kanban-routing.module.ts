import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardsListComponent } from './boards-list/boards-list.component';


const routes: Routes = [
  { path: '', component: BoardsListComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KanbanRoutingModule { }

