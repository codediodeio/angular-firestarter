import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteDetailComponent } from './note-detail.component';
import { NotesService } from '../notes.service';
import { FormsModule } from '@angular/forms';


xdescribe('NoteDetailComponent', () => {
  let component: NoteDetailComponent;
  let fixture: ComponentFixture<NoteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteDetailComponent ],
      providers: [ { provide: NotesService, useValue: { }}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
