import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Color } from '../../../models/color';
import { Client } from '../../../models/client';
import { Product } from '../../../models/product';
import { Address } from '../../../models/address';
import { GetClientService } from '../../../services/get-client.service';
import { Order } from 'src/app/models/order';
import { ProductsOrder } from 'src/app/models/products-to-order';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  clientWasEdited: boolean = false;
  showAddressForm: boolean = false;
  isClientSearched: boolean = false;
  isClientSelected: boolean = false;
  disabledClientAddAddress: boolean = false;
  colorDropdown: Color;
  colorList: Array<Color> = [];
  client: Client;
  products: Array<Product> =[];
  customerAddress: Address;
  datosCard: Array<Product> =[]
  selectedAddress: Address;
  showAddressList: boolean = false;
  showform1: boolean = false;
  showForm2: boolean = false;
  showConfirmation: boolean = false;
  showButtonCreate: boolean = false;
  disableClientsField: boolean = false;
  disableEdit: boolean = true; 
  addressList: Array<Address> = [];
  classPago: string= 'borderButtonColor';
  classAbono: string= 'borderButtonColor';
  classCard: string ='';
  bgDropdownColor: string ='';
  serviceClient: GetClientService;
  documentList: Array<any> = [];
  departmentList: Array<any> = [];
  paymentMethodList: Array<any> = [];
  contactTypeList: Array<any> = [];
  productList: Array<any> = [];
  sizeList: Array<any> = [];
  genderList: Array<any> = [];
  colorSelectedId: number = 0;
  colorBgButton: string ='';
  selectedPay : number = 0;
  code: number = 0;
  statePaid: boolean = false;
  stateDeposit: boolean = false;

  addressId = new Address();


  registerForm = new FormGroup({
    
    name: new FormControl('', [Validators.required,Validators.maxLength(25), Validators.minLength(10)]),
    email: new FormControl('',Validators.email),
    documentType:new FormControl('nv',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    document:new FormControl('',[ Validators.required,Validators.minLength(5), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    contactName: new FormControl ('',[Validators.required, Validators.minLength(5)]),
    contactType:new FormControl('nv',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    phone:new FormControl('',[Validators.required,Validators.minLength(7), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    city: new FormControl('',[Validators.required, Validators.minLength(4)]),
    address: new FormControl('',[Validators.required, Validators.minLength(5)]),
    deposit:new FormControl('',[Validators.required,Validators.minLength(4), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    department:new FormControl('nv',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    paymentMethod: new FormControl('nv',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    addresse: new FormControl('', [Validators.required,Validators.maxLength(25), Validators.minLength(10)]),
    phoneAddresse: new FormControl('',[Validators.required,Validators.minLength(7), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    replyUserData: new FormControl(),
    total: new FormControl('',[Validators.required,Validators.minLength(4), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    discount: new FormControl()
  });

  
  productForm = new FormGroup ({
    product: new FormControl('nv',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    gender: new FormControl('nv',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    size: new FormControl('nv',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    quantity: new FormControl('',[Validators.required, Validators.pattern(/^-?([1-9]\d*)?$/)]),
    stamp: new FormControl(),
    secondaryStamp: new FormControl(),
    observations: new FormControl()
  });

  get name(){return this.registerForm.get('name')}
  

  constructor( private GetClientService: GetClientService ) { 

    this.serviceClient = GetClientService;
    this.colorDropdown= new Color();
    this.client = new Client ();
     
    this.customerAddress= new Address();
    
    this.selectedAddress = new Address;
  }

  ngOnInit(): void {
    this.registerForm.controls.name.disable();
    this.registerForm.controls.phone.disable();
    this.registerForm.controls.email.disable();
    this.registerForm.controls.department.disable();
    this.registerForm.controls.city.disable();
    this.registerForm.controls.address.disable();
    this.registerForm.controls.paymentMethod.disable();
    this.registerForm.controls.deposit.disable();
  
    this.serviceClient.getListsTransversal().subscribe((resp: any) => {
      this.documentList = resp.response.documentTypes;
      this.departmentList = resp.response.departments;
      this.paymentMethodList = resp.response.paymentMethods; 
      this.contactTypeList = resp.response.contactTypes;
    });

    this.serviceClient.getProductList().subscribe((resp: any) => {
      this.productList = resp.productList;
      this.genderList = resp.genderList;
      for (let i = 0; i < this.genderList.length; i++) {
        let list = new Product
        list.idGenero = resp.genderList[i].genderId;  
        list.genero = resp.genderList[i].gender;
      }
    });
    

  
  }
  
  onProductSelect(){
    let selectedId = this.productForm.controls.product.value;
    
    for (let index = 0; index < this.productList.length; index++)
    {
      if (selectedId == this.productList[index].productId)
      {
        this.sizeList = this.productList[index].sizeList

        // Instanciar el array colorList sin items
        this.colorList = new Array<Color>();
        // Recorrer el array colores del producto seleccionado
        for (let i = 0; i < this.productList[index].colorList.length; i++) 
        {
          // Por cada color se debe crear un objeto de tipo Color
          let newColor = new Color();
          newColor.id = this.productList[index].colorList[i].colorId;
          newColor.color = this.productList[index].colorList[i].colorName;
          newColor.index = this.productList[index].colorList[i].index;
            // Se debe hacer push de ese objecto color al array colorList
          this.colorList.push(newColor);
        }  
      }
    }
    // Cambiar de producto y obtener el id del producto seleccionado
    // 
  }

  selectButtom(idButton : number){
    console.log('ingresaBoton 1')
    if (idButton == 1)
    {
      this.classPago='buttonColorsPay';
      this.classAbono='borderButtonColor';
      console.log('ingresaBoton 2')
      this.selectedPay = 1;
      this.registerForm.controls.deposit.disable();
      this.statePaid = true;
      this.stateDeposit = false;
    }
    else if (idButton == 2)
    {
      this.classAbono='buttonColorsPay';
      this.classPago='borderButtonColor';
      console.log('ingresaBoton 3')
      this.selectedPay = 2;
      this.registerForm.controls.deposit.enable();
      this.statePaid = false;
      this.stateDeposit = true;
    }

    console.log('Pago ' + this.statePaid);
    console.log('Abono ' + this.stateDeposit);
  }

  setBgDropdownColor(indiceColor: string){
    this.bgDropdownColor = 'bg-azban-' + indiceColor
  }

  selectColor(colorId: number, colorIndex: string){
    this.colorSelectedId = colorId;
    console.log(this.colorSelectedId)
    this.colorBgButton = colorIndex;
  }
    

  resetForm(){
    this.clientWasEdited = false;
    let copyDocumentType = this.registerForm.controls.documentType.value;
    let copyNumberDocument = this.registerForm.controls.document.value;
    this.registerForm.reset();
    this.registerForm.controls.documentType.setValue(copyDocumentType);
    this.registerForm.controls.document.setValue(copyNumberDocument);
    this.registerForm.controls.department.setValue('nv');
    this.registerForm.controls.contactType.setValue('nv');
    this.registerForm.controls.paymentMethod.setValue('nv');
    this.addressList = [];
    this.productForm.reset();
    this.classPago = 'borderButtonColor';
    this.classAbono = 'borderButtonColor';
    this.selectedPay = 0;

    this.enableFields();
  }

  enableFields()
  {
    this.registerForm.controls.name.enable();
    this.registerForm.controls.phone.enable();
    this.registerForm.controls.email.enable();
    this.registerForm.controls.department.enable();
    this.registerForm.controls.city.enable();
    this.registerForm.controls.address.enable();
    this.registerForm.controls.paymentMethod.enable();
    this.registerForm.controls.deposit.enable();
    this.registerForm.controls.contactType.enable();
    this.registerForm.controls.contactName.enable();
  }

  disabledFields(){
    this.registerForm.controls.name.disable();
    this.registerForm.controls.phone.disable();
    this.registerForm.controls.email.disable();
    this.registerForm.controls.department.disable();
    this.registerForm.controls.city.disable();
    this.registerForm.controls.address.disable();
    this.registerForm.controls.paymentMethod.disable();
    this.registerForm.controls.deposit.disable();
    this.registerForm.controls.addresse.disable();
    this.registerForm.controls.phoneAddresse.disable();
    this.registerForm.controls.total.disable();
  }


  buttonSearch(){

    this.enableFields()
    this.isClientSearched = true;
    this.showform1 = true;

    this.serviceClient.getData( this.registerForm.controls.documentType.value , this.registerForm.controls.document.value ).subscribe((resp: any)=>{
      console.log(resp);
      
      this.client.id = resp.response.id; 
      this.client.name = resp.response.name;
      this.client.phone = resp.response.phone;
      this.client.email = resp.response.email;     
      this.client.idContactType = resp.response.idContactType; 
      this.client.contactValue = resp.response.contactValue;
      this.code = resp.code;
      
      console.log("el codigo es:" + this.code)

      if (resp.response.adresses != null)
      {
        for (let index = 0; index < resp.response.adresses.length; index++) {
          let addAddress = new Address();
          addAddress.id = resp.response.adresses[index].id;
          addAddress.address = resp.response.adresses[index].address;
          addAddress.departmentId = resp.response.adresses[index].departmentId;
          addAddress.departmentName = resp.response.adresses[index].departmentName;
          addAddress.city = resp.response.adresses[index].city;
          addAddress.addresse = resp.response.adresses[index].addresse;
          addAddress.addressePhone = resp.response.adresses[index].addressePhone;  
      //   addAddress.department = resp.response.adresses[index].department;
        
          this.addressList.push(addAddress);

        }
      }


      
      if (resp.code == 1 && resp.response.adresses != null) {
        this.showAddressList = true;
        this.registerForm.controls.name.setValue(this.client.name);
        this.registerForm.controls.phone.setValue(this.client.phone);
        this.registerForm.controls.email.setValue(this.client.email);
        this.registerForm.controls.contactType.setValue(this.client.idContactType);
        this.registerForm.controls.contactName.setValue(this.client.contactValue);
        this.registerForm.controls.name.disable();
        this.registerForm.controls.phone.disable();
        this.registerForm.controls.email.disable();
        this.registerForm.controls.department.disable();
        this.registerForm.controls.city.disable();
        this.registerForm.controls.address.disable();
        this.registerForm.controls.contactType.disable();
        this.registerForm.controls.contactName.disable();

      } else if (resp.code == 1 && resp.response.adresses == null ) {

        this.registerForm.controls.name.setValue(this.client.name);
        this.registerForm.controls.phone.setValue(this.client.phone);
        this.registerForm.controls.email.setValue(this.client.email);
        this.registerForm.controls.contactType.setValue(this.client.idContactType);
        this.registerForm.controls.contactName.setValue(this.client.contactValue);
        this.registerForm.controls.name.disable();
        this.registerForm.controls.phone.disable();
        this.registerForm.controls.email.disable();
        this.registerForm.controls.contactType.disable();
        this.registerForm.controls.contactName.disable();
        this.disabledClientAddAddress = true;
        
      } else if(resp.code == -1){
        this.resetForm();
      }    
    })

  }


  selectClient(){
    let addProduct = new Product ();

    this.products.push(addProduct);

    console.log(this.products);
    this.showForm2 = true;
    
    this.disabledFields()
   // this.disableClientsField = true;
    this.isClientSelected = true;
    this.disableEdit = false;

    this.client.name = this.registerForm.controls.name.value;
    this.client.idDocumentType = this.registerForm.controls.documentType.value;
    this.client.document = this.registerForm.controls.document.value;
    this.client.idPaymentMethod = this.registerForm.controls.paymentMethod.value;
    this.client.deposit = this.registerForm.controls.deposit.value;
    this.client.email = this.registerForm.controls.email.value;
    this.client.phone = this.registerForm.controls.phone.value;
  //  this.client.address = this.registerForm.controls.address.value; 
    this.client.contactValue = this.registerForm.controls.contactName.value;
    this.client.idContactType = this.registerForm.controls.contactType.value;

    let address = new Address();

    address.address = this.registerForm.controls.address.value;
    address.addresse = this.registerForm.controls.addresse.value;
    address.addressePhone = this.registerForm.controls.phone.value;
    address.departmentId = this.registerForm.controls.department.value;
    address.city = this.registerForm.controls.city.value;

    if(this.clientWasEdited){
      this.client.address = [];
      this.client.address.push(address);
    }

    if(this.code == -1)
    {

      this.serviceClient.createOrUpdateClient(this.client).subscribe((resp : any)=>{
        this.client.id = resp.response;

        this.serviceClient.addAddressToClient(address, this.client.id).subscribe((resp : any)=>{
          address.id = resp.response.addresses.id;
          this.addressId.id = address.id
          console.log(this.client.id);    
        });
      }); 
    } else if (this.code == 1 && this.clientWasEdited)
    {
      this.serviceClient.createOrUpdateClient(this.client).subscribe((resp : any)=>{
        
      }); 
    }
    console.log('prueba de id direccion' + this.addressId.id)
  }

  editClient(){
    
    this.disableClientsField = false;
    this.registerForm.controls.name.enable();
    this.registerForm.controls.phone.enable();
    this.registerForm.controls.email.enable();
    this.registerForm.controls.department.enable();
    this.registerForm.controls.city.enable();
    this.registerForm.controls.address.enable();
    this.registerForm.controls.paymentMethod.enable();
    this.registerForm.controls.deposit.enable();
    this.registerForm.controls.contactType.enable();
    this.registerForm.controls.contactName.enable();
    this.registerForm.controls.addresse.enable();
    this.registerForm.controls.phoneAddresse.enable();
    this.disableEdit = true;
    this.isClientSelected= false;

    this.clientWasEdited = true;
  }
  
  asignacion()
  {
    return 56;
  }

  onAddAddress(address: Address){
    this.customerAddress = address;
    this.showAddressForm = false;

    console.log("id cliente: " + this.client.id)
    console.log('direccion adicional' + this.customerAddress.addresse)

    this.serviceClient.addAddressToClient(this.customerAddress, this.client.id).subscribe((resp : any)=>{
      this.customerAddress.id = resp.response;

      this.registerForm.controls.addresse.setValue(this.customerAddress.addresse);
      this.registerForm.controls.department.setValue(this.customerAddress.departmentId); 
      this.registerForm.controls.city.setValue(this.customerAddress.city);
      this.registerForm.controls.address.setValue(this.customerAddress.address);
      this.registerForm.controls.phoneAddresse.setValue(this.customerAddress.addressePhone);

      console.log(this.client.id);    
    });
  }
  offAddAddress(){
    this.showAddressForm = false;
  }


  addCard(){
    let product = new Product();
    product.cantidad = this.productForm.controls.quantity.value;
    product.estampado = this.productForm.controls.stamp.value;
    product.estampadoSecundario = this.productForm.controls.secondaryStamp.value;
    product.observaciones = this.productForm.controls.observations.value;
    product.genero = this.productForm.controls.gender.value;

    let productId = this.productForm.controls.product.value;
    let genderId = this.productForm.controls.gender.value;

    for (let index = 0; index < this.genderList.length; index++) 
    {
      if (genderId == this.genderList[index].genderId) {
        product.genero = this.genderList[index].gender;
        product.idGenero = this.genderList[index].genderId;
      }
    }

    for (let index = 0; index < this.productList.length; index++)
    {
      if (productId == this.productList[index].productId) {

        product.producto = this.productList[index].productName;
        product.idProducto = this.productList[index].productId

        let sizeId = this.productForm.controls.size.value;

        for(let s = 0; s < this.productList[index].sizeList.length; s++){

          if (sizeId == this.productList[index].sizeList[s].sizeId) {
           
            product.talla = this.productList[index].sizeList[s].sizeName;
            product.idTalla = this.productList[index].sizeList[s].sizeId;
          }
        }


        for(let c = 0; c < this.productList[index].colorList.length; c++){
          if (this.colorSelectedId == this.productList[index].colorList[c].colorId){
            product.color.color = this.productList[index].colorList[c].colorName;
            product.color.id = this.productList[index].colorList[c].colorId;
            product.color.index = this.productList[index].colorList[c].index;

          }
        }
      } 
    }
    
    this.datosCard.push(product);
    this.productForm.reset();
    this.productForm.controls.size.setValue('nv');
    this.productForm.controls.product.setValue('nv');
    this.productForm.controls.gender.setValue('nv');
    this.colorBgButton = '';
    this.colorSelectedId = 0;
    this.showButtonCreate = true;
    console.log('Pruba datos card' + this.datosCard)

  /*  this.serviceClient.loginByOrder(product).subscribe((resp : any)=>{
      console.log("holiwi" + product.estampado)
      for (let i = 0; i < this.datosCard.length; i++) {
        this.datosCard[i].idProducto = resp.idProducto
        console.log("El id del producto es:" + this.datosCard[i].idProducto)
      }
      
    });*/

  }

  deleteCard(i: number){
    this.datosCard.splice( i , 1)
    if (i == 0) {
    this.showButtonCreate = false;
    }
  }

  addAddressSelected(index: number){
    this.selectedAddress = this.addressList[index];
    this.addressId.id = this.addressList[index].id;
    console.log( "direccion: id" + this.addressId.id)
  }


  addressChanged(){
    this.showAddressList = false;
    this.showAddressForm = true;
  }
  saveAddressList(){
    this.showAddressList = false; 
    this.registerForm.controls.addresse.setValue(this.selectedAddress.addresse);
    this.registerForm.controls.phoneAddresse.setValue(this.selectedAddress.addressePhone);
    this.registerForm.controls.department.setValue(this.selectedAddress.departmentId);
    this.registerForm.controls.city.setValue(this.selectedAddress.city);
    this.registerForm.controls.address.setValue(this.selectedAddress.address);
    this.registerForm.controls.paymentMethod.enable();
    this.registerForm.controls.deposit.enable();
    console.log(this.addressId.id);

  }

  createOrder(){
    this.showConfirmation = true;
    let order = new Order();

    order.clientId = this.client.id;
    order.paymentMethodId = this.client.idPaymentMethod;
    order.addressId = this.addressId.id;
    order.discount = this.registerForm.controls.discount.value ?? 0;
    order.totalPrice = this.registerForm.controls.total.value;
    order.deposit = this.registerForm.controls.deposit.value;
    order.paidOut = this.statePaid;
    order.deposited = this.stateDeposit;

    for (let i = 0; i < this.datosCard.length; i++) 
    {
      order.products.push(new ProductsOrder());
      this.addressId.id;
      order.products[i].id = this.datosCard[i].idProducto;
      order.products[i].colorId = this.datosCard[i].color.id;
      order.products[i].sizeId = this.datosCard[i].idTalla;
      order.products[i].mainPrint = this.datosCard[i].estampado;
      order.products[i].secundaryPrint = this.datosCard[i].estampadoSecundario;
      order.products[i].observations = this.datosCard[i].observaciones;
      order.products[i].quantity = this.datosCard[i].cantidad;

    }

    if(order.paidOut){     
      order.deposit = order.totalPrice;
    }

    console.log(order.products);
    this.serviceClient.createOrder(order).subscribe((resp : any)=>{

    });

  }
  
  replyClient(){
    if(this.registerForm.controls.replyUserData.value){
    this.registerForm.controls.addresse.setValue(this.client.name);
    this.registerForm.controls.phoneAddresse.setValue(this.client.phone);
    this.registerForm.controls.addresse.disable();
    this.registerForm.controls.phoneAddresse.disable();
    this.registerForm.controls.addresse.setValue(this.registerForm.controls.name.value);
    this.registerForm.controls.phoneAddresse.setValue(this.registerForm.controls.phone.value);
    } else {
    this.registerForm.controls.addresse.enable();
    this.registerForm.controls.phoneAddresse.enable();
    }
  }
  addAddressFromIcon(){
    this.showAddressList = true;
  }

  closeAddressList(){
    this.showAddressList = false;
  }

  /*miPrograma()
  {
    let edades: Array <number> = [ 19, 23, 7, 23, 14];
    let nombres: Array <string> = ['Fredy' , 'Criss', 'Daniela', 'Laura', 'Pepe', 'Felipe'];
    let ventas = [
      {
        idVendedor:0,
        nombreVendedor:'',
        totalVentas : 0,
        ventas:[
          {id: 1, produto: 'Tv', cantidad: 1, precio: 100000 },
          {id: 2, produto: 'Licuaddoa', cantidad: 2, precio: 20000 },
        ]

      },
      {
        idVendedor:3,
        nombreVendedor:'',
        totalVentas : 0,
        ventas:[
          {id: 1, produto: 'Tv', cantidad: 2, precio: 100000 },
          {id: 2, produto: 'Licuaddoa', cantidad: 6, precio: 20000 },
          {id: 3, produto: 'Celular', cantidad: 2, precio: 800000 },
        ]

      },
      
      {
        idVendedor:1,
        nombreVendedor:'',
        totalVentas : 0,
        ventas:[
          {id: 4, produto: 'radio', cantidad: 1, precio: 10000 },
          {id: 2, produto: 'Licuaddoa', cantidad: 20, precio: 20000 },
          {id: 3, produto: 'Celular', cantidad: 3, precio: 800000 },
        ]

      },
      
      {
        idVendedor:2,
        nombreVendedor:'',
        totalVentas : 0,
        ventas:[
          {id: 5, produto: 'nevera', cantidad: 1, precio: 1500000 },
          {id: 4, produto: 'radio', cantidad: 2, precio: 20000 },
          {id: 6, produto: 'computador', cantidad: 1, precio: 2300000 },
        ]

      },
      
      {
        idVendedor:4,
        nombreVendedor:'',
        totalVentas : 0,
        ventas:[
          {id: 6, produto: 'computador', cantidad: 2, precio: 2300000 },
          {id: 2, produto: 'Licuaddoa', cantidad: 6, precio: 20000 },
          {id: 3, produto: 'Celular', cantidad: 1, precio: 800000 },
        ]

      },
      
      {
        idVendedor:5,
        nombreVendedor:'',
        totalVentas : 0,
        ventas:[
          {id: 6, produto: 'computador', cantidad: 2, precio: 2300000 },
          {id: 1, produto: 'tv', cantidad: 6, precio: 100000 },
          {id: 3, produto: 'radio', cantidad: 2, precio: 20000 },
        ]

      },
    
    ]
    ventas.forEach((ventasPorVendedor)=>{
      ventasPorVendedor.nombreVendedor = nombres[ventasPorVendedor.idVendedor];

      for (let i = 0; i < ventasPorVendedor.ventas.length ; i++ ){
        ventasPorVendedor.totalVentas = ventasPorVendedor.totalVentas + ventasPorVendedor.ventas[i].cantidad * ventasPorVendedor.ventas[i].precio
      }
      console.log('Vendedor ' + ventasPorVendedor.nombreVendedor + ' vendió '+ ventasPorVendedor.totalVentas)
    });


    let nombreSeleccionado = 'Daniela';

    for (let i = 0; i = nombres.length; i++){
      if (nombres[i]==nombreSeleccionado)
      {
        console.log('El nombre '+ nombreSeleccionado + 'se encuentra en la posición' + i)
      }
    }
    var fruit: string = 'mango'

    if (edades[0] == 13){ 
      console.log('tienes trece')
    } 
    else if(edades[4]> 18){
      console.log('eres mayor de edad')
    }
    else {
      console.log('no tienes trece ni mas de 18')
    }
    let total= 0;
    for (let i = 0; i < edades.length; i++ ){
      total = total + edades[i]
    }
    console.log(total);

    let i = 0
    while(i<10){
        console.log('Prueba: ' + i);
        i++;
    }
    nombres.forEach((value) => {
      console.log(value);
    });
    let nombreSeleccionado = 'Fredy';
    switch (nombres[4]){
      case 'Fredy':
        console.log("Hola Fredy")
        break;
      case 'Criss':
          console.log("Hola Criss")
        break;
      case 'Pepe':
        console.log("Hola Pepe")
        break;
        default: 
        console.log("Hola extraño qué haces en la habitación de fredy");
    }

    switch(fruit){
      case 'manzana':
        console.log("escogió manzana")
        break;
      case 'pera':
        console.log("escogió pera")
        break;
      case 'mango':
        console.log("escogió mango")
        break
      default:
        console.log("escogió otra fruta")
    }
  }*/
}