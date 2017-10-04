import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from '../note.service';

@Component({
  selector: 'note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {

  @Input() noteId: string;
  noteDoc;
  note;

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.noteDoc = this.noteService.getNote(this.noteId)
    this.note = this.noteDoc.valueChanges()
  }

  addHeartToNote(val) {
    this.noteDoc.update({ hearts: val + 1})
  }

  deleteNote() {
    this.noteDoc.delete()
  }

}
