import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ConnectWithVpInput } from '@gql';

@Component({
  selector: 'gmu-get-to-know-popup',
  templateUrl: './get-to-know-popup.component.html',
  styleUrls: ['./get-to-know-popup.component.scss']
})
export class GetToKnowPopupComponent implements OnInit
{
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<GetToKnowPopupComponent>) { }

  ngOnInit(): void
  {
    this.buildForm();
  }

  private buildForm()
  {
    this.formGroup = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(''),
      organization: new FormControl('', [Validators.required]),
      jobTitle: new FormControl('', [Validators.required]),
      description: new FormControl('')
    });
  }

  onFormSubmit()
  {
    const vpInput: ConnectWithVpInput = this.formGroup.value;
    this.dialogRef.close(vpInput);
  }

  closeBottomSheet(event: MouseEvent)
  {
    this.dialogRef.close();
    event.preventDefault();
  }

}
