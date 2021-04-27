import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'gmu-student-notes-form',
  templateUrl: './student-notes-form.component.html',
  styleUrls: ['./student-notes-form.component.scss']
})
export class StudentNotesFormComponent implements OnInit
{

  formGroup: FormGroup;
  @Input() studentId: string;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void
  {
    this.buildForm();
  }
  private buildForm()
  {
    this.formGroup = this.formBuilder.group(
      {
        parentId: new FormControl(''),
        body: new FormControl('', [Validators.required])
      });

    if (this.studentId)
    {
      this.formGroup.controls.parentId.patchValue(this.studentId);
    }
  }
  onFormSubmit()
  {

  }

}
