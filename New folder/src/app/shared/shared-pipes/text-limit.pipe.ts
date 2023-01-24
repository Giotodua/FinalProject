import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textLimit'
})
export class TextLimitPipe implements PipeTransform {

  transform(value: string, maxSymbolsCount: number): unknown {
    return value.substr(0, maxSymbolsCount);
  }

}
