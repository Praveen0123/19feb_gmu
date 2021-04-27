import { SalarySuffixPipe } from './salary-suffix.pipe';
import { async, TestBed, inject } from '@angular/core/testing';
import { CurrencyPipe } from '@angular/common';

describe('SalarySuffixPipe', () =>
{
  beforeEach(async(() =>
  {
    TestBed.configureTestingModule({
      providers: [CurrencyPipe]
    })
      .compileComponents();
  }));

  it('create an instance', inject(
    [CurrencyPipe],
    (
      currencyPipe: CurrencyPipe
    ) =>
    {
      const pipe = new SalarySuffixPipe(currencyPipe);
      expect(pipe).toBeTruthy();
    }
  ));
});
