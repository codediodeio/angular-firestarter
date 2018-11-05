import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Input() expanded = true;
  @Input() alwaysShowAction = false;
  @Input() showUser = false;
  @Input() title: string;
  @Input() description: string;
  @Input() icon: string;
  @Input() tasks: UserTask[];

  @Input() actionLabel: string;
  @Output() action = new EventEmitter<UserTask>();

  constructor() { }

  ngOnInit() {
  }

  doAction(task: UserTask) {
    this.alwaysShowAction = false;
    this.action.emit(task);
  }

  getStatusColor(status: TaskStatus) {
    switch (status) {
      case 'approved': return 'primary';
      case 'pending': return 'accent';
    }
  }
}
