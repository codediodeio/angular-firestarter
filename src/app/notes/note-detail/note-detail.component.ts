import { Component, Input } from '@angular/core';

import { NotesService } from '../notes.service';
import { NotifyService } from 'src/app/core/notify.service';

@Component({
  selector: 'note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss'],
})
export class NoteDetailComponent {

  @Input() note: any;

  constructor(private notesService: NotesService,public notifyService: NotifyService) { }

  addHeartToNote(val: number) {
    if (this.note.id) {
      this.notesService.updateNote(this.note.id, { hearts: val + 1 });
    } else {
      console.error('Note missing ID!');
    }
  }

  deleteNote(id: string) {
    this.notesService.deleteNote(id)
    .then((data)=>{
      this.notifyService.add({severity:'info',summary: "Note removed", detail: "Note: \"" + id + "\" removed.",
    data: "NoteID: " + id});
  })
  .catch((err)=>{ this.notifyService.add({severity:'error',summary: "Note removal error " + err, detail: "Note: \"" + id + "\" FAILED to remove."});

  })
  ;;
  }

}
