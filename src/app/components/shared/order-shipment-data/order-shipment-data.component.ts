import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Address } from '../../../models/address';

@Component({
  selector: 'app-order-shipment-data',
  templateUrl: './order-shipment-data.component.html',
  styleUrls: ['./order-shipment-data.component.css']
})
export class OrderShipmentDataComponent implements OnInit {
  @Input() ShipmentData: Array<any> = [];
  @Output() OpenPreviewEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() OrderToPrintEvent: EventEmitter<any>= new EventEmitter();

  check: boolean = false;
  checkOnce: Array<boolean> = [];
  checkTrue: Array<any> = [];
  orderToPrint: Array<any> = [];

  constructor() { 
  }
  
  ngOnInit(): void {
    console.log(this.ShipmentData )
  }

  checkAll(){
    if (this.check == true) {
      this.check = false;
    } else {
      this.check = true;
    }
  }

 
  oneCheck(i: number){
    if( this.checkOnce[i]== true){
      this.checkOnce[i] = false;
      this.checkTrue.shift();
      this.orderToPrint.shift();
    } else {
      this.checkOnce[i]= true;
      this.checkTrue.push(this.checkOnce[i] );
      this.orderToPrint.push(this.ShipmentData[i]);
    /*  this.orderToPrint.push(this.ShipmentData[i].customer);
      this.orderToPrint.push(this.ShipmentData[i].documentInitial);
      this.orderToPrint.push(this.ShipmentData[i].documentNumber);
      this.orderToPrint.push(this.ShipmentData[i].phone);
      this.orderToPrint.push(this.ShipmentData[i].department);
      this.orderToPrint.push(this.ShipmentData[i].city);*/
    }
    console.log(" Estado " + i, this.checkOnce[i])
    console.log("mostrar: "+  this.orderToPrint)
  }    
  
  openPreviewPrint(){
   
    
    this.OrderToPrintEvent.emit(this.orderToPrint);
    this.OpenPreviewEvent.emit();
  }
}
