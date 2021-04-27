import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'salarySuffix'
})
export class SalarySuffixPipe implements PipeTransform
{

  constructor
    (
      private currencyPipe: CurrencyPipe
    )
  {
  }

  transform
    (
      value: number
    ): string
  {
    const suffixes = ['/hr', 'K', 'M', 'G', 'T', 'P', 'E'];
    const isNegative: boolean = (value < 0);

    if (Number.isNaN(value))
    {
      return null;
    }

    value = Math.abs(value);

    // find which suffix will set for the amount based on length.
    const exp = Math.floor(Math.log(value) / Math.log(1000));

    // get amount after dividing 1000 according the suffix divide rule.
    let smallNumber = value / Math.pow(1000, exp);

    // apply nagative if original amount is nagative
    smallNumber = isNegative ? -smallNumber : smallNumber;

    return `${this.currencyPipe.transform(smallNumber, '', 'symbol', '1.0-0')}${suffixes[exp]}`;
  }
}
