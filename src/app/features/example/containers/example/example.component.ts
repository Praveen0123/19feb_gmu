import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@app/core/services/notification/notification.service';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';

@Component({
  selector: 'gmu-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit
{
  themeColor = 'primary';

  constructor
    (
      private dialog: MatDialog,
      private notification: NotificationService
    ) { }

  ngOnInit(): void
  {
  }

  openDialog(): void
  {
    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'custom-dialog',
      data: {
        themeColor: this.themeColor,
      },
    });
  }

  openNotificationDefault()
  {
    this.notification.default('Default Notification');
  }

  openNotificationInfo()
  {
    this.notification.info('Info Notification');
  }

  openNotificationSuccess()
  {
    this.notification.success('Success Notification');
  }

  openNotificationWarn()
  {
    this.notification.warn('Warn Notification');
  }

  openNotificationError()
  {
    this.notification.error('Error Notification');
  }

}
