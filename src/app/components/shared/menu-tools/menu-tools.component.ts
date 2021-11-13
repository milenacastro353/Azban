import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-tools',
  templateUrl: './menu-tools.component.html',
  styleUrls: ['./menu-tools.component.css']
})
export class MenuToolsComponent implements OnInit {
  @Output() addCollapseMenuEvent: EventEmitter <boolean> = new EventEmitter(); 

  classIcon : string ='';
  classMenuItem : string ='';
  menuCollapsed : boolean = false;
  titleCollapsed : string = 'show';
  showIcon1: boolean = true;
  showIcon2: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.classMenuItem = 'd-none';
    this.titleCollapsed = 'd-none';
  }
  
  CollapseItem(){
    console.log('ingresa');
    if (this.classIcon =='col-2'){
      this.classMenuItem='d-none';
      this.classIcon ='col-12';
      this.titleCollapsed='d-none';
      this.showIcon2 = false;
      this.showIcon1 = true;
    }
    else {
      this.classIcon= 'col-2';
      this.classMenuItem='col-10';
      this.titleCollapsed='show';
      this.showIcon2 = true;
      this.showIcon1 = false;
    }
    this.addCollapseMenuEvent.emit()
  }
}
