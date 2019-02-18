import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerQuestComponent } from './player-quest.component';

describe('PlayerQuestComponent', () => {
  let component: PlayerQuestComponent;
  let fixture: ComponentFixture<PlayerQuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerQuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
