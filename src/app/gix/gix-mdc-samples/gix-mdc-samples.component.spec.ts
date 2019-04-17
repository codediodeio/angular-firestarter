import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GixMdcSamplesComponent } from './gix-mdc-samples.component';
import { NotifyService } from 'src/app/core/notify.service';
import { MatIconModule } from '@angular/material';
import { ButtonModule } from 'primeng/button';

describe('GixMdcSamplesComponent', () => {
  let component: GixMdcSamplesComponent;
  let fixture: ComponentFixture<GixMdcSamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GixMdcSamplesComponent ],
      providers: [NotifyService],
      imports:[MatIconModule,ButtonModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GixMdcSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
