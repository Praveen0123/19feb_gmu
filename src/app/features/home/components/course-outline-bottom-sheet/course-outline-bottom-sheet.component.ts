import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { CourseWorkAtGlanceComponent } from '../course-work-at-glance/course-work-at-glance.component';
import { Pathway } from '@gql';
import { PathwaySummaryModel } from '@app/root-store/pathway-store/pathway.state';


@Component({
  selector: 'gmu-course-outline-bottom-sheet',
  templateUrl: './course-outline-bottom-sheet.component.html',
  styleUrls: ['./course-outline-bottom-sheet.component.scss']
})
export class CourseOutlineBottomSheetComponent implements OnInit
{

  constructor
    (
      @Inject(MAT_BOTTOM_SHEET_DATA) public data: { pathway: Pathway, summary: PathwaySummaryModel; },
      private bottomSheetRef: MatBottomSheetRef<CourseWorkAtGlanceComponent>
    ) { }

  ngOnInit(): void
  {
  }


  closeBottomSheet(event: MouseEvent)
  {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
