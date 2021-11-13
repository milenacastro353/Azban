import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-to-print',
  templateUrl: './to-print.component.html',
  styleUrls: ['./to-print.component.css']
})
export class ToPrintComponent implements OnInit {

  @Output() ClosePreviewPrintEvent: EventEmitter<boolean> = new EventEmitter();
  @Input() PrintData: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
    console.log("PrintData:" + this.PrintData)
  }

  closePreview(){
    this.ClosePreviewPrintEvent.emit();
  }
}
