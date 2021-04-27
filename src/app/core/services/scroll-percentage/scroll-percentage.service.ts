import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

type Target = Document | Element;

export enum ScrollTypeEnum { Horizontal = 1, Vertical = 2 }

export interface IScrollPercentageResults
{
  percentScrolled: number;
  maxScroll: number;
}

/*

CHECK OUT THIS LINK FOR SOURCE:

https://www.bennadel.com/blog/3446-monitoring-document-and-element-scroll-percentages-using-rxjs-in-angular-6-0-2.htm

*/

@Injectable({
  providedIn: 'root'
})
export class ScrollPercentageService
{

  // ---
  // PUBLIC METHODS.
  // ---

  // I return the current scroll percentage (0,100) of the given DOM node as a STREAM.
  // --
  // NOTE: The resultant STREAM is a COLD stream, which means that it won't actually
  // subscribe to the underlying DOM events unless something in the calling context
  // subscribes to the COLD stream.
  getScrollAsStream(node: Target = document, scrollTypeEnum: ScrollTypeEnum): Observable<number>
  {
    if (node instanceof Document)
    {
      // When we watch the DOCUMENT, we need to pull the scroll event from the
      // WINDOW, but then check the scroll offsets of the DOCUMENT.
      const stream = fromEvent(window, 'scroll')
        .pipe
        (
          map((event: UIEvent): number => (this.getScroll(node, scrollTypeEnum)))
        );

      return (stream);
    }
    else
    {
      // When we watch an ELEMENT node, we can pull the scroll event and the scroll
      // offsets from the same ELEMENT node (unlike the Document version).
      const stream = fromEvent(node, 'scroll')
        .pipe
        (
          map((event: UIEvent): number => (this.getScroll(node, scrollTypeEnum)))
        );

      return (stream);
    }
  }

  // I return the current vertical scroll percentage (0,100) of the given DOM node as a STREAM.
  // --
  // NOTE: The resultant STREAM is a COLD stream, which means that it won't actually
  // subscribe to the underlying DOM events unless something in the calling context
  // subscribes to the COLD stream.
  getVerticalScrollAsStream(node: Target = document): Observable<IScrollPercentageResults>
  {
    if (node instanceof Document)
    {
      // When we watch the DOCUMENT, we need to pull the scroll event from the
      // WINDOW, but then check the scroll offsets of the DOCUMENT.
      return fromEvent(window, 'scroll')
        .pipe
        (
          map((event: UIEvent): IScrollPercentageResults => this.getVerticalScroll(node))
        );
    }
    else
    {
      // When we watch an ELEMENT node, we can pull the scroll event and the scroll
      // offsets from the same ELEMENT node (unlike the Document version).
      return fromEvent(node, 'scroll')
        .pipe
        (
          map((event: UIEvent): IScrollPercentageResults => this.getVerticalScroll(node))
        );
    }
  }

  // I return the current horizontal scroll percentage (0,100) of the given DOM node as a STREAM.
  // --
  // NOTE: The resultant STREAM is a COLD stream, which means that it won't actually
  // subscribe to the underlying DOM events unless something in the calling context
  // subscribes to the COLD stream.
  getHorizontalScrollAsStream(node: Target = document): Observable<number>
  {
    if (node instanceof Document)
    {
      // When we watch the DOCUMENT, we need to pull the scroll event from the
      // WINDOW, but then check the scroll offsets of the DOCUMENT.
      const stream = fromEvent(window, 'scroll')
        .pipe
        (
          map((event: UIEvent): number => (this.getHorizontalScroll(node)))
        );

      return (stream);
    }
    else
    {
      // When we watch an ELEMENT node, we can pull the scroll event and the scroll
      // offsets from the same ELEMENT node (unlike the Document version).
      const stream = fromEvent(node, 'scroll')
        .pipe
        (
          map((event: UIEvent): number => (this.getHorizontalScroll(node)))
        );

      return (stream);
    }
  }


  // I return the current scroll percentage (0,100) of the given DOM node.
  getScroll(node: Target = document, scrollTypeEnum: ScrollTypeEnum): number
  {
    const currentScroll = (scrollTypeEnum === ScrollTypeEnum.Vertical) ? this.getCurrentScrollVertical(node) : this.getCurrentScrollHorizontal(node);
    const maxScroll = (scrollTypeEnum === ScrollTypeEnum.Vertical) ? this.getMaxScrollVertical(node) : this.getMaxScrollHorizontal(node);

    return this.calculateScrollPercentage(currentScroll, maxScroll);
  }

  // I return the current vertical scroll percentage (0,100) of the given DOM node.
  getVerticalScroll(node: Target = document): IScrollPercentageResults
  {
    const currentScroll = this.getCurrentScrollVertical(node);
    const maxScroll = this.getMaxScrollVertical(node);
    const percentScrolled = this.calculateScrollPercentage(currentScroll, maxScroll);

    return { percentScrolled, maxScroll };
  }

  // I return the current horizontal scroll percentage (0,100) of the given DOM node.
  getHorizontalScroll(node: Target = document): number
  {
    const currentScroll = this.getCurrentScrollHorizontal(node);
    const maxScroll = this.getMaxScrollHorizontal(node);

    return this.calculateScrollPercentage(currentScroll, maxScroll);
  }

  // I return the maximum scroll offset (in pixels) of the given DOM node.
  getMaxScrollVertical(node: Target = document): number
  {

    // When we want to get the available scroll height of the DOCUMENT, things get
    // a little peculiar from a cross-browser consistency standpoint. As such, when
    // dealing with the Document node, we have to look in a few different places.
    // --
    // READ MORE: https://javascript.info/size-and-scroll-window
    if (node instanceof Document)
    {
      const scrollHeight = Math.max(
        node.body.scrollHeight,
        node.body.offsetHeight,
        node.body.clientHeight,
        node.documentElement.scrollHeight,
        node.documentElement.offsetHeight,
        node.documentElement.clientHeight
      );

      const clientHeight = node.documentElement.clientHeight;

      return (scrollHeight - clientHeight);

    }
    else
    {
      return (node.scrollHeight - node.clientHeight);
    }
  }



  // ---
  // PRIVATE METHODS.
  // ---

  // I return the current scroll offset (in pixels) of the given DOM node.
  private getCurrentScrollVertical(node: Target): number
  {
    if (node instanceof Document)
    {
      return (window.pageYOffset);
    }
    else
    {
      return (node.scrollTop);
    }
  }


  // I return the current scroll offset (in pixels) of the given DOM node.
  private getCurrentScrollHorizontal(node: Target): number
  {
    if (node instanceof Document)
    {
      return (window.pageXOffset);
    }
    else
    {
      return (node.scrollLeft);
    }
  }


  // I return the maximum scroll offset (in pixels) of the given DOM node.
  private getMaxScrollHorizontal(node: Target): number
  {

    // When we want to get the available scroll height of the DOCUMENT, things get
    // a little peculiar from a cross-browser consistency standpoint. As such, when
    // dealing with the Document node, we have to look in a few different places.
    // --
    // READ MORE: https://javascript.info/size-and-scroll-window
    if (node instanceof Document)
    {
      const scrollWidth = Math.max(
        node.body.scrollWidth,
        node.body.offsetWidth,
        node.body.clientWidth,
        node.documentElement.scrollWidth,
        node.documentElement.offsetWidth,
        node.documentElement.clientWidth
      );

      const clientWidth = node.documentElement.clientWidth;

      return (scrollWidth - clientWidth);

    }
    else
    {
      return (node.scrollWidth - node.clientWidth);
    }
  }

  // I return the percent that scrolling has happened...
  private calculateScrollPercentage(currentScroll: number, maxScroll: number): number
  {
    // Ensure that the percentage falls strictly within (0,1).
    let percent = (currentScroll / Math.max(maxScroll, 1));
    percent = Math.max(percent, 0);
    percent = Math.min(percent, 1);

    // Return the percentage in a more human-consumable format.
    return Math.round((percent * 100));
  }
}
