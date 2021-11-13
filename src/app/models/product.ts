import { Color } from "./color";

export class Product {
    //fechaCreacion: Date ; 
    idProducto: number;
    producto: string = '';
    idGenero: number;
    genero: string = '';
    idTalla: number;
    talla: string = '';   
    estampado: string;  
    estampadoSecundario: string; 
    cantidad: number;
    observaciones: string;
    color: Color;
    
 
    constructor(){
        this.idProducto = 0;
        this.idTalla = 0;
        this.estampado = '';
        this.estampadoSecundario = '';
        this.cantidad = 0;
        this.observaciones= '';
        this.color = new Color();
        this.idGenero = 0;
    }

}