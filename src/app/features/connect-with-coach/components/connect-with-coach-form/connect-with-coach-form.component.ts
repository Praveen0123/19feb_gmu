import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { subYears, startOfToday } from 'date-fns';
import * as _ from 'lodash';
import { takeWhile, map } from 'rxjs/operators';

import { Pathway, ConnectWithCoach, Degree } from '@gql';


@Component({
  selector: 'gmu-connect-with-coach-form',
  templateUrl: './connect-with-coach-form.component.html',
  styleUrls: ['./connect-with-coach-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectWithCoachFormComponent implements OnInit, OnDestroy
{
  private alive = true;

  @Input() pathwaySourceList: Pathway[];
  @Output('onFormSubmit') formSubmitEventEmitter = new EventEmitter<ConnectWithCoach>();

  uniqueBachelorsDegreeList: Pathway[] = [];
  uniqueAssociatesDegreeList: Pathway[] = [];
  formGroup: FormGroup;
  phoneNumberMask: string = '(000) 000-0000';
  minimumDate: Date;
  maximumDate: Date;

  constructor
    (
      private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void
  {
    const uniqueItems = _.uniqBy(this.pathwaySourceList, (o: Pathway) => o.associateDegree.name);
    this.uniqueAssociatesDegreeList = _.orderBy(uniqueItems, (o: Pathway) => o.associateDegree.name);

    this.buildForm();
  }

  ngOnDestroy()
  {
    this.alive = false;
  }

  onFormSubmit()
  {
    if (this.formGroup.valid && this.formSubmitEventEmitter.observers.length > 0)
    {
      let currentAssociatesProgram: Degree = null;
      let desiredBachelorProgram: Degree = null;
      let desiredAssociatesProgram: Degree = null;

      if (this.formGroup.controls.currentAssociatesProgram.value != null)
      {
        const pathway: Pathway = this.formGroup.controls.currentAssociatesProgram.value;
        currentAssociatesProgram = pathway.associateDegree;
      }

      if (this.formGroup.controls.desiredBachelorProgram.value != null)
      {
        const pathway: Pathway = this.formGroup.controls.desiredBachelorProgram.value;
        desiredBachelorProgram = pathway.bachelorDegree;
      }

      if (this.formGroup.controls.desiredAssociatesProgram.value != null)
      {
        const pathway: Pathway = this.formGroup.controls.desiredAssociatesProgram.value;
        desiredAssociatesProgram = pathway.associateDegree;
      }

      // NOTE:  userId will be populated in ConnectWithCoachEffects
      const connectWithCoachFormData: ConnectWithCoach =
      {
        userId: undefined,
        firstName: this.formGroup.controls.firstName.value,
        lastName: this.formGroup.controls.lastName.value,
        emailAddress: this.formGroup.controls.emailAddress.value,
        mobileNumber: this.formGroup.controls.mobileNumber.value,
        birthDate: (this.formGroup.controls.birthDate.value != null) ? this.formGroup.controls.birthDate.value : null,
        isCurrentNovaStudent: this.formGroup.controls.isCurrentNovaStudent.value,
        currentNovaProgram: currentAssociatesProgram,
        desiredMasonProgram: desiredBachelorProgram,
        startingSemesterAtMason: this.formGroup.controls.startingSemesterAtMason.value,
        desiredNovaProgram: desiredAssociatesProgram,
        startingSemesterAtNova: this.formGroup.controls.startingSemesterAtNova.value,
      };

      this.formSubmitEventEmitter.emit(connectWithCoachFormData);
    }
  }

  onSelectionAssociatesDegree(selectedAssociatesDegree: Pathway)
  {
    // FIND ALL BACHELORS DEGREES ASSOCIATED WITH SELECTED ASSOCIATES DEGREE
    const filteredBachelorsDegreeList: Pathway[] = this.pathwaySourceList.filter((item: Pathway) => item.associateDegree.name === selectedAssociatesDegree.associateDegree.name);

    // PRODUCE UNIQUE BACHELORS DEGREES
    const uniqueItems = _.uniqBy(filteredBachelorsDegreeList, (o: Pathway) => o.bachelorDegree.name);
    this.uniqueBachelorsDegreeList = _.orderBy(uniqueItems, (o: Pathway) => o.bachelorDegree.name);


    // IF THERE IS ONLY 1 BACHELOR DEGREE, THEN AUTO-SELECT IT
    if (this.uniqueBachelorsDegreeList.length === 1)
    {
      this.formGroup.controls.desiredBachelorProgram.patchValue(this.uniqueBachelorsDegreeList[0]);
    }
    // ELSE, RESET NOVA DEGREE FORM VALUE
    else
    {
      this.formGroup.controls.desiredBachelorProgram.patchValue(null);
    }
  }


  // create the formGroup
  private buildForm()
  {
    const emailAddress = new FormControl('', [Validators.required, Validators.email]);
    const verifyEmailAddress = new FormControl('', [Validators.required, Validators.email, CustomValidators.equalTo(emailAddress)]);

    this.minimumDate = subYears(startOfToday(), 110);
    this.maximumDate = subYears(startOfToday(), 15);

    this.formGroup = this.formBuilder.group(
      {
        isCurrentNovaStudent: new FormControl(null, [Validators.required]),

        // FIELDS FOR CURRENT NOVA STUDENT (isCurrentNovaStudent === true):
        currentAssociatesProgram: new FormControl(null),
        desiredBachelorProgram: new FormControl(null),
        startingSemesterAtMason: new FormControl(null),

        // FIELDS FOR NON-NOVA STUDENT (isCurrentNovaStudent === true):
        desiredAssociatesProgram: new FormControl(null),
        startingSemesterAtNova: new FormControl(null),

        firstName: new FormControl(null, [Validators.required]),
        lastName: new FormControl(null, [Validators.required]),
        emailAddress,
        verifyEmailAddress,
        mobileNumber: new FormControl(null),
        birthDate: new FormControl(null, [Validators.required, CustomValidators.date, CustomValidators.minDate(this.minimumDate), CustomValidators.maxDate(this.maximumDate)])
      });

    // SUBSCRIBE TO VALUES CHANGING FROM FORM
    this.formGroup.controls.isCurrentNovaStudent.valueChanges
      .pipe
      (
        takeWhile(() => this.alive),
        map((isCurrentNovaStudent: boolean) =>
        {
          // IS CURRENT NOVA STUDENT
          if (isCurrentNovaStudent)
          {
            this.formGroup.controls.desiredAssociatesProgram.patchValue(null);
            this.formGroup.controls.startingSemesterAtNova.patchValue(null);
            this.formGroup.controls.desiredAssociatesProgram.setErrors(null);
            this.formGroup.controls.startingSemesterAtNova.setErrors(null);
          }

          // IS **NOT** CURRENT NOVA STUDENT
          else
          {
            this.uniqueBachelorsDegreeList = [];
            this.formGroup.controls.currentAssociatesProgram.patchValue(null);
            this.formGroup.controls.desiredBachelorProgram.patchValue(null);
            this.formGroup.controls.startingSemesterAtMason.patchValue(null);
            this.formGroup.controls.currentAssociatesProgram.setErrors(null);
            this.formGroup.controls.desiredBachelorProgram.setErrors(null);
            this.formGroup.controls.startingSemesterAtMason.setErrors(null);
          }

          this.formGroup.updateValueAndValidity();
        })
      ).subscribe();
  }
}
