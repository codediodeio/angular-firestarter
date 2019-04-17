import { TestBed, inject } from '@angular/core/testing';

import { NotifyService } from './notify.service';
import { MessageService } from 'primeng/components/common/messageservice';

describe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
  });

  it('should be created', inject([MessageService], (serviceMessage: MessageService) => {
    expect(serviceMessage).toBeTruthy();
  }));



  describe('NotifyService', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [MessageService,NotifyService]
      });
    });


    it('should be created', inject([NotifyService], (service: NotifyService) => {
      expect(service).toBeTruthy();
    }));

  });

});
