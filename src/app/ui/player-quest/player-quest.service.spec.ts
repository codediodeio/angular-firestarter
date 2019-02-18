import { TestBed } from '@angular/core/testing';

import { PlayerQuestService } from './player-quest.service';

describe('PlayerQuestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayerQuestService = TestBed.get(PlayerQuestService);
    expect(service).toBeTruthy();
  });
});
