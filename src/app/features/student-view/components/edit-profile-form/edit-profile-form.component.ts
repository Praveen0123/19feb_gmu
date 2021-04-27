import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StudentFormSubmitSuccessComponent } from '@app/features/admin/components/student-form-submit-success/student-form-submit-success.component';
import { Coach, Pathway, Student, StudentInput } from '@gql';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'gmu-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss']
})
export class EditProfileFormComponent implements OnInit
{
  formGroup: FormGroup;
  cohortYearSelected: boolean;
  @Input() pathwayList: Pathway[];
  @Input() student: Student;
  @Input() coachList: Coach[];
  @Output('onFormSubmit') formSubmitEventEmitter = new EventEmitter<StudentInput>();
  @ViewChild('form') form;
  @ViewChild('explorer') explorer;
  alive = true;

  pathway: Pathway;

  cohortYears = ['2018-2019', '2019-2020', '2020-2021'];


  constructor(
    private formBuilder: FormBuilder
  ) { }


  pathwayValue(selectedPathway: Pathway)
  {
    // SETTING PATHWAY ID
    const pathwayID: string = (selectedPathway !== null) ? (selectedPathway.id) : '';
    this.formGroup.controls.pathwayId.patchValue(pathwayID);
  }

  ngOnInit(): void
  {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if ((changes.student && !changes.student.firstChange))
    {
      this.buildForm();
    }
  }


  onFormSubmit()
  {

    if (this.formGroup.valid && this.formSubmitEventEmitter.observers.length > 0)
    {
      // SETTING THE FORM VALUES TO SEND DATA TO SERVER
      const formData = this.formGroup.value;
      const studentFormData: StudentInput = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        active: true,
        cohortYear: formData.cohortYear,
        pathwayId: formData.pathwayId,
        studentId: formData.studentId,
        email: formData.email,
        successCoachId: formData.coachName,
        id: formData.id
      };

      // EVENT WITH FORM VALUES
      this.formSubmitEventEmitter.emit(studentFormData);
    }
  }


  onSelectionCohortYear(cohortYear: string)
  {
    this.cohortYearSelected = false;
    this.formGroup.controls.cohortYear.patchValue(cohortYear);
  }


  private init()
  {
    // SETTING VALUE TO THE FORM FIELDS IF AVAILABLE
    if (this.student)
    {


      this.formGroup.controls.firstName.patchValue(this.student.firstName);
      this.formGroup.controls.lastName.patchValue(this.student.lastName);
      this.formGroup.controls.studentId.patchValue(this.student.studentId);
      this.formGroup.controls.email.patchValue(this.student.email);
      this.formGroup.controls.confirmEmail.patchValue(this.student.email);
      this.formGroup.controls.cohortYear.patchValue(this.student.cohortYear);
      this.formGroup.controls.coachName.patchValue(this.student.successCoach?.id);
      this.formGroup.controls.active.patchValue(this.student.active);
      this.formGroup.controls.pathwayId.patchValue(this.student.pathway?.id);
      this.formGroup.controls.id.patchValue(this.student.id);


      // SETTING VALUES TO AREA OF STUDY DROPDOWNS
      this.pathway = this.student.pathway;
    }
  }


  // CREATE THE FORM GROUP
  private buildForm()
  {

    this.formGroup = this.formBuilder.group(
      {
        cohortYear: new FormControl(null, [Validators.required]),
        coachName: new FormControl(null, [Validators.required]),
        pathwayId: new FormControl(null, [Validators.required]),
        id: new FormControl(null)
      });

    //  CHECK WHETHER WE ARE ON MANAGE STUDENT FORM OR IN ADD STUDENT FORM
    if (this.student) { this.cohortYearSelected = false; }
    else { this.cohortYearSelected = true; }

    this.init();
  }

}
