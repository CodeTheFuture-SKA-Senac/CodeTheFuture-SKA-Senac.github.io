import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProductionOrders } from './dialog-production-orders';

describe('DialogProductionOrders', () => {
  let component: DialogProductionOrders;
  let fixture: ComponentFixture<DialogProductionOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogProductionOrders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogProductionOrders);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
