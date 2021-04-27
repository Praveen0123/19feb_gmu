import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, AfterViewInit, OnChanges, ViewChild, SimpleChanges, HostBinding } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ScrollPercentageService, ScrollTypeEnum } from '@app/core/services/scroll-percentage/scroll-percentage.service';
import { CONFIG } from '@env/config';
import { takeWhile, map } from 'rxjs/operators';
import { Occupation, Pathway } from '@gql';
// import { Router } from '@angular/router';


@Component({
  selector: 'gmu-occupation-list-scroll',
  templateUrl: './occupation-list-scroll.component.html',
  styleUrls: ['./occupation-list-scroll.component.scss']
})
export class OccupationListScrollComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges
{
  private alive = true;

  @Input() occupationList: Occupation[];
  @Input() pathway: Pathway;
  @Input() showOccupationSkills: boolean = false;

  @Output('onOccupationClick') occupationClickEventEmitter = new EventEmitter<Occupation>();

  @ViewChild('scrollViewPort', { static: true }) scrollViewPort: CdkVirtualScrollViewport;
  @HostBinding('class.has-progress-bar') @Input() isProgressBarVisible: boolean = false;

  percentScrolled: number = 0;
  areButtonsVisible: boolean;
  occupationCardWidth: number;


  constructor
    (
      private scrollPercentageService: ScrollPercentageService

    )
  {
  }

  ngOnInit()
  {

    this.occupationCardWidth = CONFIG.OCCUPATION.OCCUPATION_CARD_WIDTH;

    // SUBSCRIBE TO SCROLL PERCENTAGE
    this.scrollPercentageService
      .getScrollAsStream(this.scrollViewPort.elementRef.nativeElement, ScrollTypeEnum.Horizontal)  // Defaults to Document if no Element supplied.
      .pipe
      (
        takeWhile(() => this.alive),
        map((percent: number) =>
        {
          this.percentScrolled = percent;
        })
      ).subscribe();
  }

  ngOnDestroy()
  {
    this.alive = false;
  }

  ngAfterViewInit()
  {
    setTimeout(() =>
    {
      this.areButtonsVisible = this.checkIfButtonsAreVisible();
      this.isProgressBarVisible = this.checkProgressBarVisibility();
    }, 200);
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if (changes.occupationList && !changes.occupationList.firstChange)
    {
      this.areButtonsVisible = this.checkIfButtonsAreVisible();
      this.isProgressBarVisible = this.checkProgressBarVisibility();
    }
  }

  onOccupationClick(occupation: Occupation)
  {
    if (this.occupationClickEventEmitter.observers.length > 0)
    {
      this.occupationClickEventEmitter.emit(occupation);
    }
  }

  scrollLeft()
  {
    const scrollByValue = this.scrollByWidth();
    this.scrollViewPort.elementRef.nativeElement.scrollBy(-scrollByValue, 0);
  }

  scrollRight()
  {
    const scrollByValue = this.scrollByWidth();
    this.scrollViewPort.elementRef.nativeElement.scrollBy(scrollByValue, 0);
  }

  trackByFn(_, item: Occupation)
  {
    return item.vpOccupationId;
  }



  private scrollByWidth(): number
  {
    const rectangle: ClientRect | DOMRect = this.scrollViewPort.elementRef.nativeElement.getBoundingClientRect();

    const numOfCardsPerWidth = Math.max(1, Math.floor(rectangle.width / this.occupationCardWidth));

    return numOfCardsPerWidth * this.occupationCardWidth;
  }

  private checkIfButtonsAreVisible(): boolean
  {
    if (!this.occupationList)
    {
      return false;
    }

    const rectangleParent: ClientRect | DOMRect = this.scrollViewPort.elementRef.nativeElement.getBoundingClientRect();
    const occupationListWidth: number = (this.occupationList.length * this.occupationCardWidth);

    // console.log(this.occupationList.length, rectangleParent.width, occupationListWidth);

    return (occupationListWidth > rectangleParent.width);
  }

  private checkProgressBarVisibility(): boolean
  {
    if (!this.occupationList)
    {
      return false;
    }

    const rectangleParent: ClientRect | DOMRect = this.scrollViewPort.elementRef.nativeElement.getBoundingClientRect();
    const occupationListWidth: number = (this.occupationList.length * this.occupationCardWidth);

    // console.log(occupationListWidth, rectangleParent.width);

    return (occupationListWidth >= rectangleParent.width);
  }



}
