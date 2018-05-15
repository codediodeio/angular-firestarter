import { TestBed, inject } from '@angular/core/testing';

import { NotesService } from './notes.service';

xdescribe('NotesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotesService]
    });
  });

  it('should be created', inject([NotesService], (service: NotesService) => {
    expect(service).toBeTruthy();
  }));
});
