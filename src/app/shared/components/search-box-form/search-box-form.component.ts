import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'gmu-search-box-form',
  templateUrl: './search-box-form.component.html',
  styleUrls: ['./search-box-form.component.scss']
})
export class SearchBoxFormComponent implements OnInit
{

  formGroup: FormGroup;
  @Input() studentID: string;
  @Output('onFormSearchSubmit') formSubmitEventEmitter = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void
  {
    this.buildForm();
  }

  onFormSubmit()
  {
    if (this.formGroup.valid)
    {
      const searchTerm: string = this.formGroup.controls.searchTerm.value;
      this.formSubmitEventEmitter.emit(searchTerm);
    }
  }

  private buildForm()
  {
    this.formGroup = this.formBuilder.group(
      {
        searchTerm: new FormControl('', [Validators.required])
      });

    if (this.studentID)
    {
      this.formGroup.controls.searchTerm.patchValue(this.studentID);
    }
  }

}
