import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Client } from '../models/client';
import { Address } from '../models/address';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class GetClientService {
  
  _url = 'https://azban-buzos-api.azurewebsites.net/api/'

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
    let urlGetProduct = this._url + 'product/getProductList/' ;
    
    return this.http.get(urlGetProduct, { headers: header });
  }

  getListsTransversal(){
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    let urlGetLists = this._url + 'Transversal/GetLists' ;
    
    return this.http.get(urlGetLists, { headers: header });
  }
  getOrderList(){
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    let urlGetOrder = this._url + 'product/getProductList/' ;
    
    return this.http.get(urlGetOrder, { headers: header });
  }
  
  getOrderStates(){
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    let urlGetState = this._url + 'state/orderStates/' ;
    
    return this.http.get(urlGetState, { headers: header });
  }

  getOrders(){
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    let urlGetOrders = this._url + 'order/GetOrders/' ;
    
    return this.http.get(urlGetOrders, { headers: header });
  }

  loginByClient(client : Client){
    let postClient = this._url + 'login/client';
    return this.http.post( postClient, client);
  }  

  loginByAddress( address : Address){
    let postAddress = this._url + 'login/client/address';
     console.log(address)
    return this.http.post( postAddress, address );
  }

  loginByOrder(product: Product){
    let postOrder = this._url + 'login/order';
    return this.http.post( postOrder, product);
  }
  
}
