import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationToasterComponent } from './notification-toaster.component';

describe('NotificationToasterComponent', () => {
  let component: NotificationToasterComponent;
  let fixture: ComponentFixture<NotificationToasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationToasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationToasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
