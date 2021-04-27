import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'gmu-student-form-submit-success',
  templateUrl: './student-form-submit-success.component.html',
  styleUrls: ['./student-form-submit-success.component.scss']
})
export class StudentFormSubmitSuccessComponent implements OnInit
{

  update: boolean = false;
  constructor(
    public dialog: MatDialogRef<StudentFormSubmitSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  closeDialogBox(event: MouseEvent)
  {
    this.dialog.close();
  }

  ngOnInit(): void
  {
    this.update = this.data.update;
  }

}
