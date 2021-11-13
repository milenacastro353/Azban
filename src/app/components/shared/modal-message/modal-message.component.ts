import { Component, OnInit, Output, Input, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.css']
})
export class ModalMessageComponent implements OnInit {
  @Output() ResetForm: EventEmitter <boolean> = new EventEmitter
  constructor() { }

  ngOnInit(): void {
  }

}
