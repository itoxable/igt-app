import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'font'})
export class FontPipe implements PipeTransform {
  transform(code: string): string {
    return String.fromCharCode(code);
  }
}
