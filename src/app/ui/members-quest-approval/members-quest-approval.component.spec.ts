import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersQuestApprovalComponent } from './members-quest-approval.component';

describe('MembersQuestApprovalComponent', () => {
  let component: MembersQuestApprovalComponent;
  let fixture: ComponentFixture<MembersQuestApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersQuestApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersQuestApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
