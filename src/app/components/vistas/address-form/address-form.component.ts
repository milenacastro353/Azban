import { Component, OnInit ,Output, EventEmitter, Input} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from '../../../models/address';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {

  @Output() addAddressEvent: EventEmitter <Address> = new EventEmitter();
  @Output() closeAddressEvent: EventEmitter <boolean>= new EventEmitter();
  @Input() DepartmentList: Array<any> = [];

  address: Address;
  addressData : FormGroup;

  constructor() {
    
    this.address = new Address();
    this.addressData = this.defineForm();
  }

  defineForm() 
  {
    return new FormGroup({
      addresse: new FormControl('', [Validators.required,Validators.maxLength(25), Validators.minLength(10)]),
      address: new FormControl('',[Validators.required, Validators.minLength(5)]),
      phoneAddresse:new FormControl('',[Validators.required,Validators.minLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      deposit:new FormControl('',[Validators.required,Validators.minLength(4), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      department:new FormControl('nv',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      city: new FormControl('',[Validators.required, Validators.minLength(4)]),
    });
  }

  ngOnInit(): void {
    //Definir controles y validaciones
    
  }
  closeAddressPopUp(){
    this.closeAddressEvent.emit()
  }

  addAddress(){
    
    this.address.addresse = this.addressData.controls.addresse.value; 
    this.address.addressePhone = this.addressData.controls.phoneAddresse.value; 
    this.address.address = this.addressData.controls.address.value;
    this.address.departmentId = this.addressData.controls.department.value;
    this.address.city = this.addressData.controls.city.value;

    this.addAddressEvent.emit(this.address)
  }
}
