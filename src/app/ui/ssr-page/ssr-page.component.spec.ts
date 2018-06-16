import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsrPageComponent } from './ssr-page.component';

xdescribe('SsrPageComponent', () => {
  let component: SsrPageComponent;
  let fixture: ComponentFixture<SsrPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SsrPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsrPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
