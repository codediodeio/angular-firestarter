import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPageComponent } from './upload-page.component';

xdescribe('UploadPageComponent', () => {
  let component: UploadPageComponent;
  let fixture: ComponentFixture<UploadPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
