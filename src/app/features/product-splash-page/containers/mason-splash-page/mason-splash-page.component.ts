import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService, IGoogleAnalyticEvent } from '@app/core/services/google-analytics/google-analytics.service';
import { ConnectWithCoachFacadeService } from '@app/root-store/connect-with-coach-store/connect-with-coach-facade.service';
import { DeviceFacadeService } from '@app/root-store/device-store/device-facade.service';
import { DeviceCharacteristics } from '@app/root-store/device-store/device.state';
import { ConnectWithVpInput } from '@gql';
import { Observable } from 'rxjs';

@Component({
  selector: 'gmu-mason-splash-page',
  templateUrl: './mason-splash-page.component.html',
  styleUrls: ['./mason-splash-page.component.scss']
})
export class MasonSplashPageComponent implements OnInit
{
  deviceCharacteristics$: Observable<DeviceCharacteristics>;
  constructor(
    private gas: GoogleAnalyticsService,
    private connectWithCoachFacadeService: ConnectWithCoachFacadeService,
    private deviceFacadeService: DeviceFacadeService) { }

  ngOnInit(): void
  {
    this.deviceCharacteristics$ = this.deviceFacadeService.getDeviceCharacteristics$();
  }

  onFormSubmit(connectWithVP: ConnectWithVpInput)
  {
    this.connectWithCoachFacadeService.requestToSaveConnectWithVPForm(connectWithVP);
  }

  onButtonClick(eventType: string)
  {

    if (eventType === 'Learn More')
    {
      // GOOGLE ANALYTICS FOR LEARN MORE BUTTON...
      const googleAnalyticEvent: IGoogleAnalyticEvent =
      {
        eventName: 'event',
        eventCategory: 'Information Page',
        eventAction: 'Learn More Button',
        eventLabel: 'Learn More Button Clicked',
        eventValue: null
      };

      this.gas.emitEvent(googleAnalyticEvent);
    }

    if (eventType === 'Get To Know Us')
    {
      // GOOGLE ANALYTICS FOR GET TO KNOW US BUTTON...
      const googleAnalyticEvent: IGoogleAnalyticEvent =
      {
        eventName: 'event',
        eventCategory: 'Information Page',
        eventAction: 'Get To Know Us Button',
        eventLabel: 'Get To Know Us Button Clicked',
        eventValue: null
      };

      this.gas.emitEvent(googleAnalyticEvent);
    }

    if (eventType === 'Connect With Us')
    {
      // GOOGLE ANALYTICS FOR CONNECT WITH US BUTTON...
      const googleAnalyticEvent: IGoogleAnalyticEvent =
      {
        eventName: 'event',
        eventCategory: 'Information Page',
        eventAction: 'Connect With Us Button',
        eventLabel: 'Connect With Us Button Clicked',
        eventValue: null
      };

      this.gas.emitEvent(googleAnalyticEvent);
    }

    if (eventType === 'Explore Advance')
    {
      // GOOGLE ANALYTICS EXPLORE ADVANCE BUTTON...
      const googleAnalyticEvent: IGoogleAnalyticEvent =
      {
        eventName: 'event',
        eventCategory: 'Information Page',
        eventAction: 'Explore Advance Button',
        eventLabel: 'Explore Advance Button Clicked',
        eventValue: null
      };

      this.gas.emitEvent(googleAnalyticEvent);
    }

    if (eventType === 'Watch Video')
    {
      // GOOGLE ANALYTICS FOR WATCH VIDEO BUTTON...
      const googleAnalyticEvent: IGoogleAnalyticEvent =
      {
        eventName: 'event',
        eventCategory: 'Information Page',
        eventAction: 'Watch Video Button',
        eventLabel: 'Watch Video Button Clicked',
        eventValue: null
      };

      this.gas.emitEvent(googleAnalyticEvent);
    }

  }

}
