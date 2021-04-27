import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService
{

  constructor
    (
      private readonly snackBar: MatSnackBar,
      private readonly zone: NgZone
    ) { }

  default(message: string, isHandset?: boolean)
  {
    this.show(
      message,
      {
        panelClass: 'default-notification-overlay',
        duration: 5000
      },
      isHandset
    );
  }

  info(message: string, isHandset?: boolean)
  {
    this.show(
      message,
      {
        panelClass: 'info-notification-overlay',
        duration: 5000
      },
      isHandset
    );
  }

  success(message: string, isHandset?: boolean): MatSnackBarRef<SimpleSnackBar>
  {
    return this.show(
      message,
      {
        panelClass: 'success-notification-overlay',
        duration: 5000
      },
      isHandset
    );
  }

  warn(message: string, isHandset?: boolean)
  {
    this.show(
      message,
      {
        panelClass: 'warning-notification-overlay',
        duration: 5000
      },
      isHandset
    );
  }

  error(message: string, isHandset?: boolean)
  {
    this.show(
      message,
      {
        panelClass: 'error-notification-overlay',
        duration: 5000
      },
      isHandset
    );
  }



  private show(
    message: string,
    configuration: MatSnackBarConfig,
    isHandset?: boolean
  ): MatSnackBarRef<SimpleSnackBar>
  {
    // If desktop, move it to top-right
    if (!isHandset)
    {
      configuration.horizontalPosition = 'right';
      configuration.verticalPosition = 'top';
    }

    return this.snackBar.open(message, null, configuration);
  }
}
