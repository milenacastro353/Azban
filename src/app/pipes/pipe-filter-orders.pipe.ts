import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeFilterOrders'
})
export class PipeFilterOrdersPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
