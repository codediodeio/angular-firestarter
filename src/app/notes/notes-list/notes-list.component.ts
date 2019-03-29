import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { Observable } from 'rxjs';
import { NotifyService } from 'src/app/core/notify.service';

@Component({
  selector: 'notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {

  notes: Observable<any[]>;
  content: string;

  constructor(private notesService: NotesService,public notifyService: NotifyService) { }

  ngOnInit() {
    this.notes = this.notesService.getData();
  }

  clickHandler() {
    this.notesService.createNote(this.content)
    .then((data)=>{
        this.notifyService.add({severity:'info',summary: "Note added", detail: "Note: \"" + this.content + "\" added."});
    })
    .catch((err)=>{ this.notifyService.add({severity:'error',summary: "Note adding error " + err, detail: "Note: \"" + this.content + "\" FAILED to add."});

    })
    ;
    this.content = '';
  }

}
