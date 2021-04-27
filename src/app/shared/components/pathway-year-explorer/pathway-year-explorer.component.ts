import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

import { GoogleAnalyticsService, IGoogleAnalyticEvent } from '@app/core/services/google-analytics/google-analytics.service';
import { Pathway } from '@gql';

@Component({
  selector: 'gmu-pathway-year-explorer',
  templateUrl: './pathway-year-explorer.component.html',
  styleUrls: ['./pathway-year-explorer.component.scss']
})
export class PathwayYearExplorerComponent implements OnInit
{

  @Input() pathwayList: Pathway[];
  @Input() selectedPathway: Pathway;
  @Input() searchButtonVisible: boolean = true;
  @Input() setCohortYearSelected: boolean = false;
  @Output('onFormSubmit') formSubmitEventEmitter = new EventEmitter<Pathway>();
  @Output('onClearSelection') clearSelectionEventEmitter = new EventEmitter();
  @Output('onCohortYearSelection') cohortYearSelectionEventEmitter = new EventEmitter<string>();
  @Output('getPathwayId') associateDegreeDetailEventEmitter = new EventEmitter<Pathway>();

  formGroup: FormGroup;
  selectedCohortYear: string = '2020-2021';
  uniqueAreaOfStudyList: Pathway[] = [];
  uniqueBachelorsDegreeList: Pathway[] = [];
  uniqueAssociatesDegreeList: Pathway[] = [];
  cohortYears = ['2020-2021', '2019-2020', '2018-2019'];


  constructor
    (
      private formBuilder: FormBuilder,
      private gas: GoogleAnalyticsService
    ) { }

  ngOnInit(): void
  {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if (changes.pathwayList && !changes.pathwayList.firstChange)
    {
      this.initForm();
    }

    if (changes.selectedPathway && !changes.selectedPathway.firstChange)
    {
      this.initForm();
    }

    if (changes.setCohortYearSelected && !changes.setCohortYearSelected.firstChange)
    {
      this.setFormDisabledEnable();
    }
  }

  onSelectionAreaOfStudy(selectedPathway: Pathway)
  {

    // PRODUCE JUST UNIQUE MASON DEGREES
    this.uniqueBachelorsDegreeList = this.buildUniqueBachelorsDegreeList(selectedPathway);

    // RESET NOVA DEGREE FORM VALUE AND NOVA DEGREE LIST
    this.formGroup.controls.associatesDegree.patchValue(null);
    this.uniqueAssociatesDegreeList = [];

    // GOOGLE ANALYTICS
    const googleAnalyticEvent: IGoogleAnalyticEvent =
    {
      eventName: 'event',
      eventCategory: 'Event-Degree Selection',
      eventAction: 'Area of Study',
      eventLabel: selectedPathway.areaOfStudy,
      eventValue: null
    };

    this.gas.emitEvent(googleAnalyticEvent);
    this.onPathwaySelection();
  }

  onSelectionCohortYear(year: string)
  {
    this.selectedCohortYear = this.formGroup.controls.cohortYear.value;
    this.formGroup.controls.areaOfStudy.patchValue(null);
    this.formGroup.controls.bachelorsDegree.patchValue(null);
    this.formGroup.controls.associatesDegree.patchValue(null);
    this.uniqueAreaOfStudyList = this.buildUniqueAreaOfStudyList();
    this.cohortYearSelectionEventEmitter.emit(year);
  }
  onSelectionBachelorsDegree(selectedPathway: Pathway)
  {
    // SELECTED AREA OF STUDY
    const selectedAreaOfStudy: Pathway = this.formGroup.controls.areaOfStudy.value;

    // PRODUCE JUST UNIQUE NOVA DEGREES
    this.uniqueAssociatesDegreeList = this.buildUniqueAssociatesDegreeList(selectedAreaOfStudy, selectedPathway);

    // IF THERE IS ONLY 1 NOVA DEGREE, THEN AUTO-SELECT IT
    if (this.uniqueAssociatesDegreeList.length === 1)
    {
      this.formGroup.controls.associatesDegree.patchValue(this.uniqueAssociatesDegreeList[0]);
    }
    // ELSE, RESET NOVA DEGREE FORM VALUE
    else
    {
      this.formGroup.controls.associatesDegree.patchValue(null);
    }

    // GOOGLE ANALYTICS
    const googleAnalyticEvent: IGoogleAnalyticEvent =
    {
      eventName: 'event',
      eventCategory: 'Event-Degree Selection',
      eventAction: 'Mason Degree',
      eventLabel: selectedPathway.bachelorDegree.name,
      eventValue: null
    };

    this.gas.emitEvent(googleAnalyticEvent);
    this.onPathwaySelection();
  }

  onSelectionAssociatesDegree(selectedPathway: Pathway)
  {
    // GOOGLE ANALYTICS
    const googleAnalyticEvent: IGoogleAnalyticEvent =
    {
      eventName: 'event',
      eventCategory: 'Event-Degree Selection',
      eventAction: 'Nova Degree',
      eventLabel: selectedPathway.associateDegree.name,
      eventValue: null
    };
    this.gas.emitEvent(googleAnalyticEvent);
    this.onPathwaySelection();
  }

  // DROPDOWNS SHOULD BE DISABLED UNTIL THE COHORT YEAR IS SELECTED IN ADD AND MANAGE STUDENT FORM
  private setFormDisabledEnable()
  {
    if (this.setCohortYearSelected) { this.formGroup.disable(); }
    else { this.formGroup.enable(); }

  }

  // TO SET THE PATHWAY VALUES TO MANAGE STUDENT
  private onPathwaySelection()
  {
    if (this.associateDegreeDetailEventEmitter.observers.length > 0)
    {
      const selectedPathwayData: Pathway = this.formGroup.controls.associatesDegree.value;
      this.associateDegreeDetailEventEmitter.emit(selectedPathwayData);
      this.cohortYearSelectionEventEmitter.emit(this.selectedCohortYear);
    }


  }

  onFormSubmit()
  {
    // RETURN (via Output above) IF FORM GROUP IS VALID *AND* PARENT COMPONENT HAS PROVIDED A CALLBACK VIA @Output
    if (this.formGroup.valid && this.formSubmitEventEmitter.observers.length > 0)
    {
      const selectedPathwayFromForm: Pathway = this.formGroup.controls.associatesDegree.value;

      this.formSubmitEventEmitter.emit(selectedPathwayFromForm);

      // GOOGLE ANALYTICS
      const formSubmissionValue: string = `Area-of-Study : ${selectedPathwayFromForm.areaOfStudy}
                                            | Mason_Degree : ${selectedPathwayFromForm.bachelorDegree.name}
                                            | Nova_Degree : ${selectedPathwayFromForm.associateDegree.name}`;

      const googleAnalyticEvent: IGoogleAnalyticEvent =
      {
        eventName: 'event',
        eventCategory: 'Event-Degree Selection Submission',
        eventAction: 'Form Submission',
        eventLabel: ` Selected Pathway:  ${formSubmissionValue}`,
        eventValue: null
      };

      this.gas.emitEvent(googleAnalyticEvent);
    }
  }

  clearSelectionClick()
  {
    if (this.clearSelectionEventEmitter.observers.length > 0)
    {
      this.clearSelectionEventEmitter.emit();
    }
  }


  private initForm()
  {
    if (this.pathwayList)
    {
      this.buildForm();
      this.uniqueAreaOfStudyList = this.buildUniqueAreaOfStudyList();

      this.uniqueBachelorsDegreeList = [];
      this.uniqueAssociatesDegreeList = [];

      if (this.selectedPathway)
      {
        this.uniqueBachelorsDegreeList = this.buildUniqueBachelorsDegreeList(this.selectedPathway);
        this.uniqueAssociatesDegreeList = this.buildUniqueAssociatesDegreeList(this.selectedPathway, this.selectedPathway);

        this.setSelectedAreaOfStudy();
        this.setSelectedBachelorsDegree();
        this.setSelecteAssociatesDegree();
      }
    }
  }


  private buildForm()
  {
    this.formGroup = this.formBuilder.group(
      {
        cohortYear: new FormControl('', [Validators.required]),
        areaOfStudy: new FormControl('', [Validators.required]),
        bachelorsDegree: new FormControl('', [Validators.required]),
        associatesDegree: new FormControl('', [Validators.required])
      });

    if (this.selectedPathway)
    {
      this.formGroup.controls.cohortYear.patchValue(this.selectedCohortYear);
      this.formGroup.controls.areaOfStudy.patchValue(this.selectedPathway);
      this.formGroup.controls.bachelorsDegree.patchValue(this.selectedPathway);
      this.formGroup.controls.associatesDegree.patchValue(this.selectedPathway);
    }

    this.setFormDisabledEnable();

  }

  private buildUniqueAreaOfStudyList(): Pathway[]
  {
    //console.log(this.selectedCohortYear);

    const filteredList = (this.selectedCohortYear) ? this.pathwayList.filter(x => x.academicYear === this.selectedCohortYear) : this.pathwayList;
    //console.log(filteredList);
    const uniqueItems = _.uniqBy(filteredList, (o: Pathway) => o.areaOfStudy);
    const orderedItems = _.orderBy(uniqueItems, (o: Pathway) => o.areaOfStudy);
    return orderedItems;
  }

  private buildUniqueBachelorsDegreeList(selectedPathway: Pathway): Pathway[]
  {
    // FIND ALL MASON DEGREES RELATED TO SELECTED AREA OF STUDY
    const filteredBachelorsDegreeList: Pathway[] = this.pathwayList.filter((item: Pathway) => item.areaOfStudy === selectedPathway.areaOfStudy && item.academicYear === this.selectedCohortYear);

    const uniqueItems = _.uniqBy(filteredBachelorsDegreeList, (o: Pathway) => o.bachelorDegree.name);
    const orderedItems = _.orderBy(uniqueItems, (o: Pathway) => o.bachelorDegree.name);

    return orderedItems;
  }

  private buildUniqueAssociatesDegreeList(selectedAreaOfStudy: Pathway, selectedBachelorsDegree: Pathway): Pathway[]
  {
    // FIND ALL NOVA DEGREES RELATED TO SELECTED AREA OF STUDY *AND* SELECTED MASON DEGEE
    const filteredAssociatesDegreeList: Pathway[] = this.pathwayList.filter
      ((item: Pathway) =>
      (
        item.areaOfStudy === selectedAreaOfStudy.areaOfStudy
        && item.bachelorDegree.name === selectedBachelorsDegree.bachelorDegree.name
        && item.academicYear === this.selectedCohortYear
      )
      );

    // PRODUCE JUST UNIQUE NOVA DEGREES
    const uniqueItems = _.uniqBy(filteredAssociatesDegreeList, (o: Pathway) => o.associateDegree.name);
    const orderedItems = _.orderBy(uniqueItems, (o: Pathway) => o.associateDegree.name);

    return orderedItems;
  }

  private setSelectedAreaOfStudy()
  {
    if (this.selectedPathway && this.uniqueAreaOfStudyList && this.uniqueAreaOfStudyList.length > 0)
    {
      const foundIndex = this.uniqueAreaOfStudyList.findIndex((item: Pathway) => item.areaOfStudy === this.selectedPathway.areaOfStudy);

      if (foundIndex >= 0)
      {
        this.uniqueAreaOfStudyList[foundIndex] = this.selectedPathway;
      }
    }
  }

  private setSelectedBachelorsDegree()
  {
    if (this.selectedPathway && this.uniqueBachelorsDegreeList && this.uniqueBachelorsDegreeList.length > 0)
    {
      const foundIndex = this.uniqueBachelorsDegreeList.findIndex((item: Pathway) => item.bachelorDegree.name === this.selectedPathway.bachelorDegree.name);

      if (foundIndex >= 0)
      {
        this.uniqueBachelorsDegreeList[foundIndex] = this.selectedPathway;
      }
    }
  }

  private setSelecteAssociatesDegree()
  {
    if (this.selectedPathway && this.uniqueAssociatesDegreeList && this.uniqueAssociatesDegreeList.length > 0)
    {
      const foundIndex = this.uniqueAssociatesDegreeList.findIndex((item: Pathway) => item.associateDegree.name === this.selectedPathway.associateDegree.name);

      if (foundIndex >= 0)
      {
        this.uniqueAssociatesDegreeList[foundIndex] = this.selectedPathway;
      }
    }
  }

}
