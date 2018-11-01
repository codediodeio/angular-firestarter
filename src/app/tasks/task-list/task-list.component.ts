import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Input() expanded = true;
  @Input() title: string;
  @Input() description: string;
  @Input() icon: string;
  @Input() tasks: Task[];

  @Input() actionLabel: string;
  @Output() action = new EventEmitter<Task>();

  constructor() { }

  ngOnInit() {
  }

  doAction(task: Task) {
    this.action.emit(task);
  }
}
