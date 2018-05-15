import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

xdescribe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
  }));
});
