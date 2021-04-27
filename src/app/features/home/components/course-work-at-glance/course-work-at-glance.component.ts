import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, ɵConsole } from '@angular/core';

import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CourseOutlineBottomSheetComponent } from '../course-outline-bottom-sheet/course-outline-bottom-sheet.component';
import { Pathway } from '@gql';
import { PathwaySummaryModel } from '@app/root-store/pathway-store/pathway.state';
import { PathwayService } from '@app/root-store/pathway-store/pathway.service';
import { environment } from '@env/environment';



@Component({
  selector: 'gmu-course-work-at-glance',
  templateUrl: './course-work-at-glance.component.html',
  styleUrls: ['./course-work-at-glance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseWorkAtGlanceComponent implements OnInit, OnChanges
{
  @Input() pathway: Pathway;

  totalClassCount: number;
  totalCreditCount: number;
  pathwaySummaryModel: PathwaySummaryModel;

  constructor
    (
      private bottomSheet: MatBottomSheet
    ) { }

  ngOnInit(): void
  {
    this.init();

  }

  ngOnChanges(changes: SimpleChanges)
  {
    if (changes.pathway && !changes.pathway.firstChange)
    {
      this.init();
    }
  }

  getCourseDetails()
  {
    this.bottomSheet.open(CourseOutlineBottomSheetComponent,
      {
        data: { pathway: this.pathway, summary: this.pathwaySummaryModel },
        panelClass: 'my-component-bottom-sheet1'
      });
  }

  getCoursePDF()
  {
    const url = `${environment.API.courseCatalogUrl}/${this.pathway.code}.pdf`;
    window.open(url);
  }

  private init()
  {
    if (this.pathway)
    {
      this.pathwaySummaryModel = PathwayService.getPathwaySummaryModel(this.pathway);
      this.totalClassCount = this.pathwaySummaryModel.masonClassCount + this.pathwaySummaryModel.novaClassCount;
      this.totalCreditCount = this.pathwaySummaryModel.masonCredits + this.pathwaySummaryModel.novaCredits;
    }
  }
}
