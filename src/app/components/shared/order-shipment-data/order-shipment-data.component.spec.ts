import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderShipmentDataComponent } from './order-shipment-data.component';

describe('OrderShipmentDataComponent', () => {
  let component: OrderShipmentDataComponent;
  let fixture: ComponentFixture<OrderShipmentDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderShipmentDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderShipmentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
