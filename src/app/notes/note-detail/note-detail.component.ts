import { Component, Input } from '@angular/core';

import { NotesService } from '../notes.service';

@Component({
  selector: 'note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss'],
})
export class NoteDetailComponent {

  @Input() note: any;

  constructor(private notesService: NotesService) { }

  addHeartToNote(val: number) {
    if (this.note.id) {
      this.notesService.updateNote(this.note.id, { hearts: val + 1 });
    } else {
      console.error('Note missing ID!');
    }
  }

  deleteNote(id: string) {
    this.notesService.deleteNote(id);
  }

}
