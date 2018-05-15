import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationMessageComponent } from './notification-message.component';

xdescribe('NotificationMessageComponent', () => {
  let component: NotificationMessageComponent;
  let fixture: ComponentFixture<NotificationMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
