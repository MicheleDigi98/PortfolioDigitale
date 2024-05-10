import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[DotDirective]',
  standalone: true
})
export class DotDirectiveDirective {

  constructor(rootElementRef: ElementRef) {
    const nativeElement = (rootElementRef.nativeElement as HTMLElement);
    nativeElement.style.display = "flex";
    nativeElement.style.flexDirection = "row";
    nativeElement.style.alignItems = "center";
    nativeElement.style.gap = "10px";
    if(nativeElement){
      const dot = document.createElement('div');
      dot.classList.add("DotElement");
      dot.style.display = "block";
      dot.style.aspectRatio = "1 / 1";
      dot.style.width = "8px";
      dot.style.backgroundColor = "rgb(68, 68, 68)";
      dot.style.borderRadius = "50%";
      nativeElement.appendChild(dot);
    }
  }

}
