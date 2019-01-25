import { TestBed } from '@angular/core/testing';

import { SeasonService } from './season.service';

describe('SeasonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeasonService = TestBed.get(SeasonService);
    expect(service).toBeTruthy();
  });
});
