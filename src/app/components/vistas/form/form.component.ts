import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Color } from '../../../models/color';
import { Client } from '../../../models/client';
import { Product } from '../../../models/product';
import { Address } from '../../../models/address';
import { GetClientService } from '../../../services/get-client.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
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
  classPago: string= 'btn-outline-warning';
  classAbono: string= 'btn-outline-warning';
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
    money:new FormControl('',[Validators.required,Validators.minLength(4), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    department:new FormControl('nv',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    paymentMethod: new FormControl('nv',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    addresse: new FormControl('', [Validators.required,Validators.maxLength(25), Validators.minLength(10)]),
    phoneAddresse: new FormControl('',[Validators.required,Validators.minLength(7), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    replyUserData: new FormControl(),
    total: new FormControl('',[Validators.required,Validators.minLength(4), Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
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
    this.registerForm.controls.money.disable();
  
    this.serviceClient.getListsTransversal().subscribe((resp: any) => {
      this.documentList = resp.documentList;
      this.departmentList = resp.departmentList;
      this.paymentMethodList = resp.paymentMethodList; 
      this.contactTypeList = resp.contactTypeList;
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
      this.classPago='buttonColors';
      this.classAbono='btn-outline-warning';
      console.log('ingresaBoton 2')
      this.registerForm.controls.money.disable();
      this.selectedPay = 1;
    }
    else if (idButton == 2)
    {
      this.classAbono='buttonColors';
      this.classPago='btn-outline-waringn';
      console.log('ingresaBoton 3')
      this.registerForm.controls.money.enable();
      this.selectedPay = 2;
    }
  }

  setBgDropdownColor(indiceColor: string){
    this.bgDropdownColor = 'bg-azban-' + indiceColor
  }

  selectColor(colorId: number, colorIndex: string){
    this.colorSelectedId = colorId;
    console.log(this.colorSelectedId)
    this.colorBgButton = colorIndex;
  }
    


  buttonSearch(){
    
    
    this.isClientSearched = true;
    this.registerForm.controls.name.enable();
    this.registerForm.controls.phone.enable();
    this.registerForm.controls.email.enable();
    this.registerForm.controls.department.enable();
    this.registerForm.controls.city.enable();
    this.registerForm.controls.address.enable();
    this.registerForm.controls.paymentMethod.enable();
    this.registerForm.controls.money.enable()
   
    
    this.showform1 = true;

    this.serviceClient.getData( this.registerForm.controls.documentType.value , this.registerForm.controls.document.value ).subscribe((resp: any)=>{
      console.log(resp);

      
      this.addressList = [];
    
      for (let index = 0; index < resp.addressList.length; index++) {
        let addAddress = new Address();
        addAddress.phoneAddresse = resp.addressList[index].phoneAddresse;  
        addAddress.address = resp.addressList[index].address;
        addAddress.city = resp.addressList[index].city;
        addAddress.addresse = resp.addressList[index].addresse;
        addAddress.department = resp.addressList[index].department;
        addAddress.idDepartment = resp.addressList[index].departmentId;
      
        this.addressList.push(addAddress);
      }

      this.client.phone = resp.phone;
      this.client.name = resp.fullName;
      this.client.email = resp.email;     
      this.client.contactId = resp.contactId; 
      this.client.contactName = resp.contactName;
      
      if (resp.code == 1 && resp.addressList.length > 0) {
        this.showAddressList = true;
        this.registerForm.controls.name.setValue(this.client.name);
        this.registerForm.controls.phone.setValue(this.client.phone);
        this.registerForm.controls.email.setValue(this.client.email);
        this.registerForm.controls.contactType.setValue(this.client.contactId);
        this.registerForm.controls.contactName.setValue(this.client.contactName);
        this.registerForm.controls.name.disable();
        this.registerForm.controls.phone.disable();
        this.registerForm.controls.email.disable();
        this.registerForm.controls.department.disable();
        this.registerForm.controls.city.disable();
        this.registerForm.controls.address.disable();
        this.registerForm.controls.contactType.disable();
        this.registerForm.controls.contactName.disable();

      } else if (resp.code == 1 && resp.addressList.length == 0 ) {

        this.registerForm.controls.name.setValue(this.client.name);
        this.registerForm.controls.phone.setValue(this.client.phone);
        this.registerForm.controls.email.setValue(this.client.email);
        this.registerForm.controls.contactType.setValue(this.client.contactId);
        this.registerForm.controls.contactName.setValue(this.client.contactName);
        this.registerForm.controls.name.disable();
        this.registerForm.controls.phone.disable();
        this.registerForm.controls.email.disable();
        this.registerForm.controls.contactType.disable();
        this.registerForm.controls.contactName.disable();
        this.disabledClientAddAddress = true;
        
      } else if(resp.code == 2){
        this.disabledClientAddAddress = true;
      }    
    })
  }


  selectClient(){
    console.log('agregar')
    let addProduct = new Product ();

    this.products.push(addProduct);

    console.log(this.products);
    this.showForm2 = true;
    
    this.disableClientsField = true;
    this.isClientSelected = true;
    this.disableEdit = false;

    this.client.name = this.registerForm.controls.name.value;
    this.client.idDocumentType = this.registerForm.controls.documentType.value;
    this.client.document = this.registerForm.controls.document.value;
    this.client.idDepartment = this.registerForm.controls.department.value;
    this.client.city = this.registerForm.controls.city.value;
    this.client.idPaymentMethod = this.registerForm.controls.paymentMethod.value;
    this.client.money = this.registerForm.controls.money.value;
    this.client.email = this.registerForm.controls.email.value;
    this.client.phone = this.registerForm.controls.phone.value;
    this.client.address = this.registerForm.controls.address.value; 
    this.client.contactType = this.registerForm.controls.contactType.value;
    this.client.contactName = this.registerForm.controls.contactName.value;

    let address = new Address();

    address.address = this.registerForm.controls.address.value;
    address.addresse = this.registerForm.controls.addresse.value;
    address.phoneAddresse = this.registerForm.controls.phone.value;

    
    this.serviceClient.loginByClient(this.client).subscribe((resp : any)=>{
      this.client.idClient = resp.id;
      console.log("El id del cliente es: " + this.client.idClient)
    });   

    this.serviceClient.loginByAddress(address).subscribe((resp : any)=>{
      address.idAddress = resp.idAddress;
      console.log("El id de direccion es" + address.idAddress)
    });

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
    this.registerForm.controls.money.enable();
    this.registerForm.controls.contactType.enable();
    this.registerForm.controls.contactName.enable();
    this.registerForm.controls.addresse.enable();
    this.registerForm.controls.phoneAddresse.enable();
    this.disableEdit = true;
    this.isClientSelected= false;
  }
  
  asignacion()
  {
    return 56;
  }

  onAddAddress(address: Address){
    this.customerAddress = address;
    this.registerForm.controls.addresse.setValue(this.customerAddress.addresse);
    this.registerForm.controls.department.setValue(this.customerAddress.department); 
    this.registerForm.controls.city.setValue(this.customerAddress.city);
    this.registerForm.controls.address.setValue(this.customerAddress.address);
    this.registerForm.controls.phoneAddresse.setValue(this.customerAddress.phoneAddresse);
    this.showAddressForm = false;
    
    console.log(address)
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
      }
    }

    for (let index = 0; index < this.productList.length; index++)
    {
      if (productId == this.productList[index].productId) {

        product.producto = this.productList[index].productName;

        let sizeId = this.productForm.controls.size.value;

        for(let s = 0; s < this.productList[index].sizeList.length; s++){

          if (sizeId == this.productList[index].sizeList[s].sizeId) {
           
            product.talla = this.productList[index].sizeList[s].sizeName;
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
    console.log("holiwi 2: " + product.estampado)

    this.serviceClient.loginByOrder(product).subscribe((resp : any)=>{
      console.log("holiwi" + product.estampado)
      for (let i = 0; i < this.datosCard.length; i++) {
        this.datosCard[i].idProducto = resp.idProducto
        console.log("El id del producto es:" + this.datosCard[i].idProducto)
      }
      
    });

  }

  deleteCard(i: number){
    this.datosCard.splice( i , 1)
    if (i == 0) {
    this.showButtonCreate = false;
    }
  }

  addAddressSelected(index: number){
    this.selectedAddress = this.addressList[index];
  }


  addressChanged(){
    this.showAddressList = false;
    this.showAddressForm = true;
  }
  saveAddressList(){
    this.showAddressList = false; 
    this.registerForm.controls.addresse.setValue(this.selectedAddress.addresse);
    this.registerForm.controls.phoneAddresse.setValue(this.selectedAddress.phoneAddresse);
    this.registerForm.controls.department.setValue(this.selectedAddress.idDepartment);
    this.registerForm.controls.city.setValue(this.selectedAddress.city);
    this.registerForm.controls.address.setValue(this.selectedAddress.address);
    this.registerForm.controls.paymentMethod.enable();
    this.registerForm.controls.money.enable();
    
  }

  createOrder(){
    this.showConfirmation = true;

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