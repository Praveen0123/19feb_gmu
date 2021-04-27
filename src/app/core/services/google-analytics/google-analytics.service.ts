import { Injectable } from '@angular/core';

declare let ga: Function;

export interface IGoogleAnalyticEvent
{
  eventName: string;
  eventCategory: string;
  eventAction: string;
  eventLabel?: string;
  eventValue?: string | number;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService
{

  public emitEvent
    (
      googleAnalyticEvent: IGoogleAnalyticEvent
    )
  {
    ga('send',
      googleAnalyticEvent.eventName,
      {
        eventCategory: googleAnalyticEvent.eventCategory,
        eventLabel: googleAnalyticEvent.eventLabel,
        eventAction: googleAnalyticEvent.eventAction,
        eventValue: googleAnalyticEvent.eventValue
      });
  }
}
