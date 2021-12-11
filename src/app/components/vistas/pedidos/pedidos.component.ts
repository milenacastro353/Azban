import { Component, OnInit } from '@angular/core';
import { Empleados } from 'src/app/models/empleados';
import { Order } from 'src/app/models/order';
import { State } from 'src/app/models/state';
import { Vendedor } from 'src/app/models/vendendor';
import { GetClientService } from 'src/app/services/get-client.service';
import { PipeFilterOrdersPipe } from 'src/app/pipes/pipe-filter-orders.pipe';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})

export class PedidosComponent implements OnInit {
  collapseTableClass: string = 'col-lg-11 col-md-11';
  collapseMenuClass: string = 'col-lg-1 col-md-1';
  showOrder: boolean = false;
  showShipmentData: boolean = false;
  showOrderData: boolean = true;
  showPaid: Array<boolean> = [];
  showConfirmation:boolean = false;
  showPreview: boolean = false;
  classOrderList: string = '';
  classShipment: string = '';
  classBgColor: Array<any> = [];
  openView: Array<boolean> = [];
  openViewAll: boolean = false;
  serviceClient: GetClientService;
  messageConfirmation: string = '¿Esta seguro de cambiar el estado?';
  orderData : Array <any> = [];
  differenceData : Array<number> = [];
  paymentSelectedIndex:number = -1;
  orderToPrint: Array<any> = [];
  statesList: Array<any> = [];
  orderId: number = 0;
  stateId: number = 0;
  filterByWords: string  ='';
  stateCheckClothes : boolean = false; 
  stateCheckStamp: boolean = false;
  date = new Date();
  proccessStampList = [
    { id: 1, proccess: 'Faltante', colorHexRef: '#FFFFFF'},
    { id: 2, proccess: 'Diseñado', colorHexRef: '#FF2828'},
    { id: 3, proccess: 'En espera entrega', colorHexRef: '#FFFFFF'},
    { id: 4, proccess: 'Listo', colorHexRef: '#FFFFFF'}
  ];

  constructor(private GetClientService: GetClientService) { 
    this.serviceClient = GetClientService;
    
    let day = this.date.getDate();
    let month = this.date.getMonth() + 1;
    let year = this.date.getFullYear();

    this.date = new Date(year + '-' + month + '-' + day);
  }

  ejercicio1()
  {//Realice un algoritmo que me dé la sumatoria de los números enteros comprendidos entre el 1 y el 10, es decir, 1 + 2 + 3 +…. + 10

    let sumatoria = 0
    for (let i = 0; i <=10; i++){
        sumatoria += i
        
    }
    console.log("suma(10):" + sumatoria)

  }
  ejercicio2(){
    var horaTotal=0;
    var precioHoraInicial = 1000;
    var precioHora = 600;
    var horaInicial = 12;
    var horaFinal = 15;
    var precioTotal= 0;
    var minutoInicial = 45;
    var minutoFinal = 44;
    // hayar horas a cobrar

    horaTotal = horaFinal - horaInicial ;

    if (minutoInicial < minutoFinal) {
      horaTotal++
    } 
    console.log(horaTotal)

    // operación para hayar el costo total
    if (horaTotal <= 1 ) {
      console.log("El valor a pagar es:" + precioHoraInicial)
      
    } 
    else if (horaTotal > 1) { 
      console.log("El valor a pagar es:" + ((precioHora * (horaTotal - 1)) +  precioHoraInicial) )

    }
  }

  ejercicio3(){
    /* Realice un algoritmo que determine el pago a realizar por la entrada a un 
   espectáculo donde se pueden comprar sólo hasta cuatro entradas, donde 
    al costo de dos entradas se les descuenta el 10%, al de tres entradas el 
    15% y a la compra de cuatro tickets se le descuenta el 20 %.*/
    let precioBoleta = 20000;
    let pagoARealizar = 0;
    let compraEntrada = 3;
    let descuento1 = 10;
    let descuento2 = 15; 
    let descuento3 = 20;
    if (compraEntrada == 2) {
      pagoARealizar = (precioBoleta - ((precioBoleta * descuento1) / 100))* compraEntrada
      console.log("valor a pagar de boleta " + pagoARealizar)
    } else if(compraEntrada == 3){
      pagoARealizar = (precioBoleta - ((precioBoleta * descuento2) / 100))* compraEntrada
      console.log("valor a pagar de boleta " + pagoARealizar)
    } else if (compraEntrada == 4){
      pagoARealizar = (precioBoleta - ((precioBoleta * descuento3) / 100)) * compraEntrada
      console.log("valor a pagar de boleta " + pagoARealizar )
    }
  }
  ejercicio4(){
    /*Realice un algoritmo para la empresa Constructora Tecno vivir Casas 
    C.A., que le permita calcular e imprimir la nómina para su cancelación a 
    un total de 50 obreros calificados a quienes debe cancelar por horas 
    trabajadas. La hora trabajada se pautó en 10.000 Pesos.
    
    Crear clase empleados (nombre, horasTrabajadas, totalPagar) funcion que recibe precioHora y calcula totalPagar
    
    */
    let empleados: Array<Empleados> =[];
    let precioHora= 10000;
    let e1 = new Empleados();
    e1.horasTrabajadas= 20;
    e1.nombre= "Carlos";
    
    let e2 = new Empleados();
    e2.horasTrabajadas= 50;
    e2.nombre= "Luis"; 

    let e3 = new Empleados();
    e3.horasTrabajadas= 10;
    e3.nombre= "Cesar";

    let e4= new Empleados();
    e4.horasTrabajadas= 60;
    e4.nombre= "Ricaurte";

    let e5 = new Empleados();
    e5.horasTrabajadas = 45;
    e5.nombre = "Yolima";

    empleados.push(e1);
    empleados.push(e2);
    empleados.push(e3);
    empleados.push(e4);
    empleados.push(e5);

    empleados.forEach((emp)=> {
      emp.calcularTotalAPagar( precioHora )
      console.log("el empleado " + emp.nombre + " se le pagará " + emp.valorAPagar);
    });

    
  }
  ejercicio5()
  {
    /*Realice un algoritmo que halle la sumatoria de los números enteros 
    múltiplos de 5, comprendidos entre el 1 y el 100, es decir, 5 + 10 + 15 +…. 
    + 100. El programa deberá imprimir los números en cuestión y finalmente 
    su sumatoria*/
    let total=0;
    for (let i = 0; i <= 100; i+=5) {
      total += i 
      console.log("ejercicio 5 numeros en cuestión: " + i)
    }
    console.log("ejercicio 5 sumatoria: " + total)
    
    let r = 5 / 2;//recibe resultado de división
    let r2 =9 % 5;//recibe el reciduo
    //otra forma de hallar el multiplo de 5 
    let total2=0;
    for (let i = 1; i <= 100; i++) 
    {
      let residuo = i % 5;
      
      if(residuo == 0){
        console.log(i + ' ES miltiplo de 5');
      }
      else{
        console.log(i + ' NO es Multiplo de 5');
      }

    }
  }
  


  ejercicio6(){
    /*Realice un algoritmo que halle la sumatoria de los números enteros pares 
  comprendidos entre el 1 y el 100, es decir, 2 + 4 + 6 +…. + 100. El 
  programa deberá imprimir los números en cuestión y Finalmente su 
  sumatoria*/
    let total = 0;
    for( let i = 0; i <= 100; i = i + 2){
    total += i
    console.log("ejercicio 6 numeros en cuestión: " + i)
   }
   console.log("ejercicio 6 sumatoria par: " + total)
    
  }

  ejercicio7(){
    /*Realice un algoritmo que lea los primeros 300 números enteros y 
    determine cuántos de ellos son Impares; al final deberá indicar su 
    sumatoria. */
    let total = 0;
    for( let i = 0 ; 0 <= 300 ; i++)
    {
      let r = i % 2;
      if (r == 0)
      {
        console.log( i + " Sí es impar")
        total += i 
      }
    }
    console.log(total)
  }

  ejercicio8(){
    /*El sueldo que perciben los vendedores de una empresa automotriz, está 
    integrado por de la manera siguiente: el salario mínimo, mas $100.000 por 
    cada auto vendido, más el 2% del valor de los autos vendidos.
    Se tiene varios vendedores, por cada vendedor se tiene el nombre y el 
    precio de cada auto que vendió en la quincena; es posible que algunos 
    vendedores no hayan realizado venta alguna, en tal caso solo se tendrá 
    el nombre. */
    let salarioMinimo= 870000;
    let adicionalAutoVendido= 100000;
    let adicionalPorcentajeAuto: 2;
    let sueldo: 0;
    let vendedores: Array<Vendedor> = [];
    let vendedor1 = new Vendedor;
    vendedor1.nombre = "Camila";
    vendedor1.precioAutoVendido = [3000000, 4000000, 5000000];
    
    let vendedor2 = new Vendedor;
    vendedor2.nombre = "Laura";
    vendedor2.precioAutoVendido = [7000000, 8000000, 9000000, 50000000];
    
    let vendedor3 = new Vendedor;
    vendedor3.nombre = "Lola";
    vendedor3.precioAutoVendido = [1000000, 9000000];
    
    let vendedor4 = new Vendedor;
    vendedor4.nombre = "Lucas";
    vendedor4.precioAutoVendido = [0];
    
    let vendedor5 = new Vendedor;
    vendedor5.nombre = "Juan";
    vendedor5.precioAutoVendido = [1500000, 4500000, 5500000];
    
    let sumaAutosVendidos= new Vendedor; 
    /*let ve = vendedores.find(vendedor=> vendedor.nombre == "Camila" && vendedor.sueldo < 1000000);
    let existe = vendedores.some(vendedor=> vendedor.nombre.includes('R'))
    vendedores.every(v=> v.sueldo > 500000);
    vendedores.map(v => v.nombre)
    vendedores.filter(v => v.nombre.includes ('Ca'))*/
  

    vendedores.push(vendedor1);
    vendedores.push(vendedor2);
    vendedores.push(vendedor3);
    vendedores.push(vendedor4);
    vendedores.push(vendedor5);
    for(let i = 0; i < vendedores.length; i++)
    {
      let total= 0;
      for (let j = 0; j < vendedores[i].precioAutoVendido.length; j++)
      {
        total += vendedores[i].precioAutoVendido[j] 
        
      
      }
      console.log("las ventas de " + vendedores[i].nombre + " es igual a " + total);
    }
    

    vendedores.forEach((vendedor)=> {
      vendedor.salarioTotal( salarioMinimo, adicionalAutoVendido)
      //sumaAutosVendidos += precioAutoVendido
      console.log( "HOLA"+ sumaAutosVendidos);
    });

    /*for (let i = 0; i < vendedores.length; i++) {
      vendedores[i].salarioTotal( salarioMinimo, adicionalAutoVendido);
      console.log("CHAO" + vendedores[i])
    }*/

  }

  ejercicio9(){
    let total=0;
    for (let index = 2; index <= 160; index+=2) 
    {
      total+= index;
    }
    console.log("la suma(160):" + total)
    
    //otra opción
    let total2 = 0;
    for (let index = 2; index <= 160; index++)
    {
      let r = index % 2 
      if (r == 0)
      {
        console.log( index + "Sí es par")
        total2 += index
      }
    }
    console.log(total2 + "es la sumatoria del par")
  }
  ejercicio10(){
    /*elabore un algoritmo que calcule e imprima la suma 
    1+1/2+1/3+1/4……1/50.*/
    for (let i = 0; i + 1 < 50; i++) {
      console.log(i)
    }
  }

  ngOnInit(): void {
   /* this.ejercicio1();
    this.ejercicio2();
    this.ejercicio3();
    this.ejercicio4();
    this.ejercicio5();
    this.ejercicio6();
    this.ejercicio8();
    this.ejercicio7();
    this.ejercicio9();
    this.ejercicio10();*/
    this.serviceClient.getOrderStates().subscribe((resp:any) => {
      this.statesList = resp.response
      console.log("estado de lista " + this.statesList[5].stateId)
    });

    this.serviceClient.getOrdersInProcess().subscribe((resp:any) => {
      this.orderData = resp.response;
    
      
      console.log(this.orderData)
      let payment : boolean 

      for (let i = 0; i < this.orderData.length; i++) {
        this.openView.push(false);    
        payment = this.orderData[i].payed;
        this.showPaid.push(payment)
      } 

      for (let i = 0; i < this.orderData.length; i++) { 
        
        let dateTest = new Date(this.orderData[i].deliveryDate);
        //console.log('Fecha-1: ' + dateTest.getUTCDate() + '-' + (dateTest.getUTCMonth() + 1) + '-' + dateTest.getUTCFullYear());
        //console.log( 'Fecha Actual: ' + this.date.getUTCDate() + '-' + (this.date.getUTCMonth() + 1) + '-' + this.date.getUTCFullYear());
        
        this.differenceData[i] = dateTest.getTime() - this.date.getTime();
        
        if (this.differenceData[i] == 0) {
          this.classBgColor[i] = 'color-yellow';
        } else if (this.differenceData[i] < 0 ){
          this.classBgColor[i] = 'color-red';
        } else if (this.differenceData[i] > 0){
          this.classBgColor[i] = 'color-green';
        }
      }
    });

  }


  collapseMenuPanel(){
    if(this.collapseTableClass == 'col-lg-11 col-md-11')
    {
      this.collapseTableClass = 'col-lg-9 col-md-9';
      this.collapseMenuClass = 'col-lg-3 col-md-3';
    }
    else 
    {
      this.collapseTableClass = 'col-lg-11 col-md-11';
      this.collapseMenuClass = 'col-lg-1 col-md-1';
    }

    console.log(this.collapseTableClass)
    
  }
  lookOrder(i: number){

   if (this.openView[i] == true){
     this.openView[i] = false;
   } else {
     this.openView[i] = true;
   }
  }

  viewAllDetails(){
    if(this.openViewAll == true){
      this.openViewAll = false;
    } else {
      this.openViewAll = true;
    }
  }

  changeList(idButton: number ){
    if (idButton == 1)
    {
      this.classOrderList = 'btn-primary';
      this.classShipment = '';
      this.showShipmentData = false;
      this.showOrderData = true;
    } else if (idButton == 2) 
    {
      this.classOrderList = '';
      this.classShipment = 'btn-primary';
      this.showShipmentData = true;
      this.showOrderData = false;
    }
  }
  payIcon(i: number){
    
    if(this.showPaid[i] == false){
      this.showConfirmation = true;
      this.paymentSelectedIndex = i
    }
  }
  saveChangePay(){
    this.showConfirmation = false;
    this.showPaid[this.paymentSelectedIndex] = true;


    this.orderId = this.orderData[this.paymentSelectedIndex].id;  

    console.log('orden id' + this.orderId);
    this.serviceClient.payOrder(this.orderId).subscribe(()=>{

    });
  }
  notSaveChangePay(){
    this.showConfirmation = false;
  }
  openPreview(){
    this.showPreview = true;
    
  }
  closePreview(){
    this.showPreview = false;
  }
  orderPreview(print : any){
    this.orderToPrint = print
    console.log(this.orderToPrint)
  }

  changeState(index : number, orderId : number){
    let newStateId = this.statesList[index].stateId;

    this.serviceClient.getChangeState(orderId, newStateId).subscribe((resp: any) =>{
      
    });
  }

  GetColorStampState(idStampState : number)
  {
    for(let i = 0; i < this.proccessStampList.length; i++)
    {
      if (idStampState == this.proccessStampList[i].id)
      {
        return this.proccessStampList[i].colorHexRef;
      }
    }

    return '#FFFFFF';
  }

  changeStampState(field : HTMLSelectElement, productId : number){
    
    field.style.backgroundColor = this.proccessStampList[field.selectedIndex].colorHexRef;
    //let newStateId = this.statesList[index].stateId;

    //this.serviceClient.getChangeState(orderId, newStateId).subscribe((resp: any) =>{
      
    //});
  }

  filterByState(orderStateId : number){
// Produccion = 2, Creados = 1, Listo PE = 3, Todos = 0
    if (this.stateId == 0)
    {
      return true;
    }
    else if(this.stateId == 1 && this.stateId == orderStateId)
    {
      return true;
    }
    else  if(this.stateId == 2 && this.stateId == orderStateId)
    {
      return true;
    }
    else  if(this.stateId == 3 && this.stateId == orderStateId)
    {
      return true;
    }
    else{
      return false;
    }
  }
  setStateId(i: number){
    this.stateId = i
  }

  checkClothes(idProduct : number){
    if(this.stateCheckClothes == true){
      console.log('false')
      this.stateCheckClothes = false;
    } else{
      console.log('true')
      this.stateCheckClothes = true;
    }
    this.serviceClient.checkProductExist(1 , this.stateCheckClothes).subscribe((resp:any)=>{

    });
  }

  checkStamp(){
    if (this.stateCheckStamp == true) { 
      console.log('false')
      this.stateCheckStamp = false;
    } else {
      console.log('true')
      this.stateCheckStamp = true;
    }
    this.serviceClient.checkstampInProduction(1, this.stateCheckStamp).subscribe((resp:any)=>{

    });
  }
}
  