import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent {
  canDelete: boolean;

  @Output() delete = new EventEmitter<boolean>();

  cancel() {
    this.canDelete = null;
  }

  deleteBoard() {
    this.delete.emit(true);
    this.canDelete = null;
  }

  prepareForDelete() {
    this.canDelete = true;
  }
}
