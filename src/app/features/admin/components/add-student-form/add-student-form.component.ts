import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StudentFormSubmitSuccessComponent } from '../student-form-submit-success/student-form-submit-success.component';
import { Coach, Pathway, Student, StudentInput } from '@gql';
import { PathwayExplorerFormComponent } from '@app/shared/components/pathway-explorer-form/pathway-explorer-form.component';



@Component({
  selector: 'gmu-add-student-form',
  templateUrl: './add-student-form.component.html',
  styleUrls: ['./add-student-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddStudentFormComponent implements OnInit, OnChanges
{
  formGroup: FormGroup;
  cohortYearSelected: boolean;
  @Input() pathwayList: Pathway[];
  @Input() student: Student;
  @Input() forUpdate: boolean = false;
  @Input() coachList: Coach[];
  @Output('onFormSubmit') formSubmitEventEmitter = new EventEmitter<StudentInput>();
  @ViewChild('form') form;
  @ViewChild('explorer') explorer;
  alive = true;

  pathway: Pathway;

  cohortYears = ['2018-2019', '2019-2020', '2020-2021'];


  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
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
        active: formData.active ?? true,
        cohortYear: formData.cohortYear,
        pathwayId: formData.pathwayId,
        studentId: formData.studentId,
        email: formData.email,
        successCoachId: formData.coachName,
        id: formData.id
      };

      // EVENT WITH FORM VALUES
      this.formSubmitEventEmitter.emit(studentFormData);

      const dialogConfig = new MatDialogConfig();

      dialogConfig.position = {
        top: '100px'
      };
      dialogConfig.width = '450px';
      dialogConfig.height = '220px';
      dialogConfig.data = { update: this.forUpdate };
      window.scrollTo(0, 0);
      this.dialog.open(StudentFormSubmitSuccessComponent, dialogConfig);
      if (!this.forUpdate)
      {
        this.buildForm();
        this.formGroup.reset();
        this.formGroup.markAsPristine();
        this.formGroup.markAsUntouched();
        this.form.resetForm();
        this.explorer.initForm();

      }
    }
  }


  onSelectionCohortYear(cohortYear: string)
  {
    this.cohortYearSelected = false;
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
    const email = new FormControl('', [Validators.required, Validators.email]);
    const confirmEmail = new FormControl('', [Validators.required, Validators.email, CustomValidators.equalTo(email)]);

    this.formGroup = this.formBuilder.group(
      {

        firstName: new FormControl(null, [Validators.required]),
        lastName: new FormControl(null, [Validators.required]),
        studentId: new FormControl(null, [Validators.required]),
        email,
        confirmEmail,
        cohortYear: new FormControl(null, [Validators.required]),
        coachName: new FormControl(null, [Validators.required]),
        pathwayId: new FormControl(null, [Validators.required]),
        active: new FormControl(null),
        id: new FormControl(null)
      });

    //  CHECK WHETHER WE ARE ON MANAGE STUDENT FORM OR IN ADD STUDENT FORM
    if ((!this.forUpdate && this.student)) { this.cohortYearSelected = false; }
    else { this.cohortYearSelected = true; }

    this.init();
  }

}
