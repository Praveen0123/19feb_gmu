import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FaqDialogComponent } from '@app/shared/components/faq-dialog/faq-dialog.component';

@Component({
  selector: 'gmu-faq-open-button',
  templateUrl: './faq-open-button.component.html',
  styleUrls: ['./faq-open-button.component.scss']
})
export class FaqOpenButtonComponent implements OnInit
{

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void
  {
  }

  onClickOpen()
  {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.position = {
      top: '100px'
    };
    dialogConfig.width = '75%';
    dialogConfig.height = '75%';
    dialogConfig.data = {};
    window.scrollTo(0, 0);
    this.dialog.open(FaqDialogComponent, dialogConfig);
  }
}
