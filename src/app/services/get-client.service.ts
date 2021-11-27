import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Client } from '../models/client';
import { Address } from '../models/address';
import { Product } from '../models/product';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class GetClientService {
  
  _url = 'https://azban-buzos-api.azurewebsites.net/api/'
  _url2 = 'https://demo1089139.mockable.io/'

  constructor( private http: HttpClient )
  { 
    console.log("Services")
  }
  
  getData(idDocumentType: number , document: string){
    
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    let urlGetClient = this._url + 'Client/GetClient/' + idDocumentType + '/' + document;
    
    return this.http.get(urlGetClient, { headers: header });
  }

  getProductList(){
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    let urlGetProduct = this._url + 'Product/GetProductList/' ;
    
    return this.http.get(urlGetProduct, { headers: header });
  }

  getListsTransversal(){
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    let urlGetLists = this._url + 'Transversal/GetLists' ;
    
    return this.http.get(urlGetLists, { headers: header });
  }
  getOrderList(){
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    let urlGetOrder = this._url + 'product/GetProductList/' ;
    
    return this.http.get(urlGetOrder, { headers: header });
  }
  
  getOrderStates(){
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    let urlGetState = this._url + 'state/orderStates/' ;
    
    return this.http.get(urlGetState, { headers: header });
  }

  getOrdersInProcess(){
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    let urlGetOrders = this._url + 'Order/GetInProccessOrders/' ;
    
    
    return this.http.get(urlGetOrders, { headers: header });
  }

  createOrUpdateClient(client : Client){
    let postClient = this._url + 'Client/CreateOrUpdate';

    return this.http.post( postClient, client);
  }  

  addAddressToClient( address : Address , id : number ){
    let postAddress = this._url + 'Client/AddAddress/' + id
     
    return this.http.post( postAddress, address );
  }

  loginByOrder(product: Product){
    let postOrder = this._url + 'login/order';
    return this.http.post( postOrder, product);
  }
  
  createOrder(order : Order){
    let postCreateOrder = this._url + '/Order/CreateOrder';
    return this.http.post(postCreateOrder, order )
  }
}
