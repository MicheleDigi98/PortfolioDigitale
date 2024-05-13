import { Component } from '@angular/core';
import {ScrollLayoutComponent} from "../../layout/scroll-layout/scroll-layout.component";
import {ScrollAnimationDirective} from "../../layout/scroll-layout/scroll-animation.directive";
import {DotLayoutComponent} from "../../layout/dot-layout/dot-layout.component";
import {DotDirectiveDirective} from "../../layout/dot-layout/dot-directive.directive";

@Component({
  selector: 'me-page',
  standalone: true,
  imports: [
    ScrollLayoutComponent,
    ScrollAnimationDirective,
    DotLayoutComponent,
    DotDirectiveDirective
  ],
  templateUrl: './me-page.component.html',
  styleUrl: './me-page.component.scss'
})
export class MePageComponent {

  protected readonly ScrollAnimationDirective = ScrollAnimationDirective;
}
