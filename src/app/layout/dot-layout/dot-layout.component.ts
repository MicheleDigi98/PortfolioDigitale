import {AfterViewInit, Component, ContentChildren, ElementRef, OnDestroy, QueryList, ViewChild} from '@angular/core';
import {DotDirectiveDirective} from "./dot-directive.directive";

@Component({
  selector: 'dot-layout',
  standalone: true,
  imports: [],
  templateUrl: './dot-layout.component.html',
  styleUrl: './dot-layout.component.scss'
})
export class DotLayoutComponent implements AfterViewInit, OnDestroy {
    @ViewChild("dotCanvas", { read: ElementRef, static: true }) dotCanvas: ElementRef;

    private _renderingState = false;
    constructor(private _dotLayout: ElementRef) {}

    public ngAfterViewInit(): void {
      this._renderingState = true;
      this._startRenderingLoop();
    }

    public ngOnDestroy(): void {

    }

    private _startRenderingLoop(){
      if (this._renderingState)
        window.requestAnimationFrame(() => this._startRenderingLoop());
      this._drawCanvas();
    }

    private _drawCanvas(){
      const points = this._getElementsPoint();
      const canvas = this.dotCanvas.nativeElement as HTMLCanvasElement;
      if(canvas && points.length > 0){
        const canvasBounding = canvas.getBoundingClientRect();
        canvas.width = canvasBounding.width;
        canvas.height = canvasBounding.height;

        const ctx = canvas.getContext('2d');
        if(ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.strokeStyle = "rgb(68, 68, 68)";
          ctx.lineWidth = 3;
          ctx.beginPath();
          for(let i=0; i < points.length - 1; i++){
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[i + 1].x, points[i + 1].y);
          }
          ctx.stroke();
          ctx.closePath()
        }
      }
    }

    private _getElementsPoint(): {x: number, y: number}[] {
      const esito: {x: number, y: number}[] = [];

      const nativeElement = this._dotLayout.nativeElement as HTMLElement;
      const canvas = this.dotCanvas.nativeElement as HTMLCanvasElement;
      if(nativeElement && canvas){
        const canvasBounding = canvas.getBoundingClientRect();
        const elements = nativeElement.querySelectorAll('.DotElement');
        for(let i = 0; i < elements.length; i++){
          const element = elements[i];
          const bounding = element.getBoundingClientRect();
          esito.push({x: bounding.x + (bounding.width * 0.5) - canvasBounding.x, y: bounding.y + (bounding.height * 0.5) - canvasBounding.y});
        }
      }

      return esito.sort((a, b) => a.y - b.y);
    }
}
