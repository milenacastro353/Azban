import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmation-message',
  templateUrl: './confirmation-message.component.html',
  styleUrls: ['./confirmation-message.component.css']
})
export class ConfirmationMessageComponent implements OnInit {
  @Input() ConfirmationPay: String = '';
  @Output() confirmChangeEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() confirmNotChangeEvent: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  confirmChange(){
    this.confirmChangeEvent.emit();
  }

  confirmNotChange(){
    this.confirmNotChangeEvent.emit();
  }
}
