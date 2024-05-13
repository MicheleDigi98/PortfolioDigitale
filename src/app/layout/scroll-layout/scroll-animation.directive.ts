import {Directive, ElementRef, Input} from '@angular/core';

export interface KeyFrame{
  percentuale?: number,
  top?: string,
  left?: string,
  rotateZ?: string,
  translateX?: string,
  translateY?: string,
  scaleX?: string,
  scaleY?: string
}

export interface Animation {
  [percentuale: string]: KeyFrame
}

@Directive({
  selector: '[scrollAnimation]',
  standalone: true
})
export class ScrollAnimationDirective {
  private _percentualeAttualeVistaLayout = 0;

  private _stati: KeyFrame[] = [];
  private _statoAttuale: KeyFrame = {
    percentuale: 0,
    top: "0",
    left: "0",
    rotateZ: "0",
    translateX: "0",
    translateY: "0",
    scaleX: "1",
    scaleY: "1"
  };

  constructor(
    private _elementRef: ElementRef
  ) {
    const nativeElement = _elementRef.nativeElement as HTMLElement
    nativeElement.style.position = 'relative';
  }

  @Input() set scrollAnimation(animation: Animation){
    const keys = Object.keys(animation).sort((a, b) => parseInt(a) - parseInt(b));
    for(const key of keys){
      animation[key].percentuale = parseInt(key);
      this._stati.push(animation[key]);
    }
    this._bind();
  }

  private _bind(){
    const nativeElement = (this._elementRef.nativeElement as HTMLElement);
    nativeElement.style.top = `${this._statoAttuale.top}%`;
    nativeElement.style.left = `${this._statoAttuale.left}%`;
    const translateString = `translateX(${this._statoAttuale.translateX}%) translateY(${this._statoAttuale.translateY}%)`;
    const scaleString = `scaleX(${this._statoAttuale.scaleX}) scaleY(${this._statoAttuale.scaleY})`;
    const rotateString = `rotateZ(${this._statoAttuale.rotateZ}deg)`;

    nativeElement.style.transform = `${translateString} ${scaleString} ${rotateString}`;
  }

  public setPercentualeAttuale(origineContainer: number, altezzaContainer: number) {
    const nativeElement = (this._elementRef.nativeElement as HTMLElement);
    nativeElement.style.top = "0%";
    nativeElement.style.left = "0%";
    nativeElement.style.transform = "";

    const boundingClientRect = (this._elementRef.nativeElement as HTMLElement).getBoundingClientRect();
    this._percentualeAttualeVistaLayout = (1 - ((boundingClientRect.y - origineContainer) / altezzaContainer)) * 100;

    if(this._percentualeAttualeVistaLayout > 100)
      this._percentualeAttualeVistaLayout = 100;
    if(this._percentualeAttualeVistaLayout < 0)
      this._percentualeAttualeVistaLayout = 0;

    this._calcolaStatoAttuale();
    this._bind();
  }

  private _findByKey<T extends keyof KeyFrame>(key: T): string{
    const debug = (...messages: any[]) => {
      if(key === 'top' && false){
        console.log(`${key}:`, ...messages);
      }
    }

    let percentualePrecedente = 0;
    let precedente = key.includes('scale') ? '1' :'0';

    let trovatoElementoSuccessivo = false;
    let percentualeSuccessivo = 0;
    let successivo = key.includes('scale') ? '1' :'0';

    for(const stato of this._stati){
      if(stato.percentuale !== undefined){
        if(stato.percentuale <= this._percentualeAttualeVistaLayout && stato[key] !== undefined){
          precedente = stato[key] as string;
          percentualePrecedente = stato.percentuale;
        }
        if(stato.percentuale >= this._percentualeAttualeVistaLayout  && stato[key] !== undefined){
          successivo = stato[key] as string;
          percentualeSuccessivo = stato.percentuale;
          trovatoElementoSuccessivo = true;
          break;
        }
      }
    }

    if(!trovatoElementoSuccessivo){
      percentualeSuccessivo = percentualePrecedente;
      successivo = precedente;
    }

    debug("Percentuale:", this._percentualeAttualeVistaLayout, "Precedente:", precedente, `[${percentualePrecedente}], Successivo:`, successivo, `[${percentualeSuccessivo}]`);

    const numberPrecedente = parseFloat(precedente);
    const numberSuccessivo = parseFloat(successivo);
    const percentualeAttualePesata = this._percentualeAttualeVistaLayout - percentualePrecedente;
    const percentualeSuccessivoPesata = percentualeSuccessivo - percentualePrecedente;

    let percentualeComputata = 1;
    if(percentualePrecedente !== percentualeSuccessivo && percentualeSuccessivoPesata !== 0)
      percentualeComputata = percentualeAttualePesata / percentualeSuccessivoPesata;
    if(percentualeComputata > 1)
      percentualeComputata = 1;
    if(percentualeComputata < 0)
      percentualeComputata = 0;

    const valoreAttuale = numberPrecedente + ( (numberSuccessivo - numberPrecedente) * percentualeComputata );

    return String(valoreAttuale)
  }

  private _calcolaStatoAttuale(){
    this._statoAttuale = {
      top: this._findByKey('top'),
      left: this._findByKey('left'),
      rotateZ: this._findByKey('rotateZ'),
      scaleX: this._findByKey('scaleX'),
      scaleY: this._findByKey('scaleY'),
      translateX: this._findByKey('translateX'),
      translateY: this._findByKey('translateY'),
    }
  }
}
