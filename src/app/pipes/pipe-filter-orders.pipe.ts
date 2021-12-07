import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeFilterOrders'
})
export class PipeFilterOrdersPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultSearch = [];
    for (const result of value) {
      if (result.client.toLowerCase().indexOf(arg.toLowerCase()) > -1 ) {
        resultSearch.push(result);
      }

      for(let i = 0; i < result.products.length; i++)
      {
        if (result.products[i].mainPrint.toLowerCase().indexOf(arg.toLowerCase()) > -1 )
        {
          resultSearch.push(result);
          break;
        }
      }
    }

    console.log('resultado');
    console.log(resultSearch);
    return resultSearch;
  }
}
