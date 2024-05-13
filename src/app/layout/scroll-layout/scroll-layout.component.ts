import {AfterViewInit, Component, ContentChildren, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ScrollAnimationDirective} from "./scroll-animation.directive";

@Component({
  selector: 'scroll-layout',
  standalone: true,
  imports: [ScrollAnimationDirective],
  templateUrl: './scroll-layout.component.html',
  styleUrl: './scroll-layout.component.scss'
})
export class ScrollLayoutComponent implements AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  @ContentChildren(ScrollAnimationDirective, {descendants: true}) elementiAnimati: QueryList<ScrollAnimationDirective>;

  public ngAfterViewInit() {
    const scrollElement = this.scrollContainer.nativeElement as HTMLDivElement;
    scrollElement.addEventListener('scroll', () => {
      const boundingClientRect = scrollElement.getBoundingClientRect();
      for(const scrollAnimation of this.elementiAnimati){
        scrollAnimation.setPercentualeAttuale(boundingClientRect.y, boundingClientRect.height);
      }
    })
  }
}
