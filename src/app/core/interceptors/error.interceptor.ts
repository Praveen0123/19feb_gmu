import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { NotificationService } from '../services/notification/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor
{
  constructor
    (
      private notificationService: NotificationService
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    // console.warn('ErrorInterceptor');

    return next.handle(req).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) =>
      {
        if (error.status !== 401)
        {
          // 401 handled in auth.interceptor
          this.notificationService.error(error.message);
        }
        return throwError(error);
      })
    );
  }
}
