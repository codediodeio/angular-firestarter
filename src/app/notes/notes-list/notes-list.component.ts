import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {

  notes: Observable<any[]>;
  content: string;

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.notes = this.notesService.getData();
  }

  clickHandler() {
    this.notesService.createNote(this.content);
    this.content = '';
  }

}
