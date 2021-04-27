import { Component, OnInit, Input, OnChanges, SimpleChanges, HostBinding } from '@angular/core';
import { DeviceCharacteristics } from '@app/root-store/device-store/device.state';
import { environment } from '@env/environment';
import { getYear } from 'date-fns';
import { VERSION } from '@env/version';



@Component({
  selector: 'gmu-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnChanges
{
  whatAmI: string;
  copyright: string;

  @HostBinding('class.is-development') isDevelopment: boolean = false;

  @Input() deviceCharacteristics: DeviceCharacteristics;

  constructor() { }

  ngOnInit(): void
  {
    const year: number = getYear(Date.now());
    const environmentName: string = (!environment.production) ? ` - ${environment.environment_name}` : '';

    this.getWhatAmI();
    this.copyright = `${year} - ${environment.client_name} | version ${VERSION.version}${environmentName}`;
    this.isDevelopment = environment.development;
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if (changes.deviceCharacteristics && !changes.deviceCharacteristics.firstChange)
    {
      this.getWhatAmI();
    }
  }

  private getWhatAmI()
  {
    if (this.deviceCharacteristics?.isExtraSmall)
    {
      this.whatAmI = 'XSMALL';
    }
    else if (this.deviceCharacteristics?.isSmall)
    {
      this.whatAmI = 'SMALL';
    }
    else if (this.deviceCharacteristics?.isMedium)
    {
      this.whatAmI = 'MEDIUM';
    }
    else if (this.deviceCharacteristics?.isLarge)
    {
      this.whatAmI = 'LARGE';
    }
    else if (this.deviceCharacteristics?.isExtraLarge)
    {
      this.whatAmI = 'XLARGE';
    }
  }
}
