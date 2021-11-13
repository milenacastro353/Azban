import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Address } from 'src/app/models/address';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {
  @Input() AddressData: Array<Address> = [];
  @Output() AddressSelectedEvent: EventEmitter<number> = new EventEmitter();
  @Output() AddressChangedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() AddressListSaveEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() CloseAddressListEvent: EventEmitter<boolean> = new EventEmitter();
 
  address: Address;
  addressSelectedId: number = -1;

  
  constructor() { 
    this.address = new Address();
  }

  ngOnInit(): void {

  }

  deleteAddress(index : number){
    this.AddressData.splice(index , 1)
  }

  selectAddress(index : number){
    this.addressSelectedId = index;
    this.AddressSelectedEvent.emit(index)
  }

  changeAddress(){
    
    this.AddressChangedEvent.emit()

  }

  saveSelectedAddress(){
    this.AddressListSaveEvent.emit()
  }
  closeAddressList(){
    this.CloseAddressListEvent.emit()
  }
}

