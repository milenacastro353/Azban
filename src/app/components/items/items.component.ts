import { Item } from './../../models/item';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  
  items: Item[]=[];
  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
      id: 0,
      title:'Buzo Capotero',
      price:130000,
      quantity:2,
      completed:false,
      },
      {
      id: 1,
      title:'CropTop',
      price:49000,
      quantity:1,
      completed:false,
      },
      {
      id: 2  ,
      title:'Jogger',
      price:55000,
      quantity:1,
      completed:true,
      }
    ];
  }

}
