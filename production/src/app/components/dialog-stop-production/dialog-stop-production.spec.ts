import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStopProduction } from './dialog-stop-production';

describe('DialogStopProduction', () => {
  let component: DialogStopProduction;
  let fixture: ComponentFixture<DialogStopProduction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogStopProduction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogStopProduction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
