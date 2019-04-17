import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GixDialogSampleComponent } from './gix-dialog-sample.component';

describe('GixDialogSampleComponent', () => {
  let component: GixDialogSampleComponent;
  let fixture: ComponentFixture<GixDialogSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GixDialogSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GixDialogSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
