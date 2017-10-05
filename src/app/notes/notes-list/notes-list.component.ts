import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';

@Component({
  selector: 'notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {

  notes;
  content;

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    // this.notes = this.noteService.getData()
    this.notes = this.noteService.getSnapshot()
  }

  createNote() {
    this.noteService.create(this.content)
    this.content = ''
  }

}
