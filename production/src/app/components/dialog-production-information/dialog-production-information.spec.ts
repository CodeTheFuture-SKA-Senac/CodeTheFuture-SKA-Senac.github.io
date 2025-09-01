import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProductionInformation } from './dialog-production-information';

describe('DialogProductionInformation', () => {
  let component: DialogProductionInformation;
  let fixture: ComponentFixture<DialogProductionInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogProductionInformation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogProductionInformation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
