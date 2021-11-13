import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Color } from '../../../models/color';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  @Input() ProductsData: Array<Product> = []
  @Output() deleteDataCardEvent: EventEmitter <number> = new EventEmitter();
  colorList: Array<Color> = [];
  
  constructor() { 

    let addColorBlanco = new Color ();
    let addColorRojo = new Color ();
    let addColorAzulOscuro = new Color ();
    let addColorRosado = new Color();
    let addColorNegro = new Color ();
    let addColorLila = new Color ();

    this.colorList.push(addColorBlanco);
    this.colorList.push(addColorRojo);
    this.colorList.push(addColorAzulOscuro);
    this.colorList.push(addColorRosado);
    this.colorList.push(addColorNegro);
    this.colorList.push(addColorLila);
  }

  ngOnInit(): void {
  }

  deleteProduct(indice: number){

    this.deleteDataCardEvent.emit(indice)
   }

  mapColor(colorIndex: string){
  }
}
