import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NotificationService } from '../services/notification/notification.service';

@Injectable()
export class NotifyInterceptor implements HttpInterceptor
{
  constructor
    (
      private notificationService: NotificationService
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    // console.warn('NotifyInterceptor');

    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) =>
      {
        if (event instanceof HttpResponse && event.status === 201)
        {
          this.notificationService.success('Object created.');
        }
      })
    );
  }
}
