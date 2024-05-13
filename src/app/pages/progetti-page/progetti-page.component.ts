import {Component, OnInit} from '@angular/core';
import {ProgettiService} from "../../../servicies/progetti.service";
import {ProgettiServiceMetadataModel} from "../../../models/ProgettiServiceModel";
import {ProgettoCardComponent} from "./progetto-card/progetto-card.component";
import {DotLayoutComponent} from "../../layout/dot-layout/dot-layout.component";
import {DotDirectiveDirective} from "../../layout/dot-layout/dot-directive.directive";

@Component({
  selector: 'progetti-page',
  standalone: true,
  imports: [
    ProgettoCardComponent,
    DotLayoutComponent,
    DotDirectiveDirective
  ],
  templateUrl: './progetti-page.component.html',
  styleUrl: './progetti-page.component.scss'
})
export class ProgettiPageComponent implements OnInit{
  public listaAnni = new Set<string>();
  public listaProgetti: ProgettiServiceMetadataModel[] = [];
  public isLoading = true;

  constructor(
    private _progettiService: ProgettiService
  ) {}

  public async ngOnInit() {
    const progetti = await this._progettiService.getListaProgetti();

    let annoNonSpecificatoPresente = false;
    for(const progetto of progetti){
      const nomeProgetto = progetto.replace('Progetti/', '');
      const metadatiProgetto = await this._progettiService.getMetadataProgetto(nomeProgetto);
      metadatiProgetto.path = `/Progetti/${nomeProgetto}`;

      metadatiProgetto.annoCreazione && this.listaAnni.add(metadatiProgetto.annoCreazione);
      if(!metadatiProgetto.annoCreazione)
        annoNonSpecificatoPresente = true;
      this.listaProgetti.push(metadatiProgetto);


    }

    this.isLoading = false;
    annoNonSpecificatoPresente && this.listaAnni.add('Anno non specificato');
  }

  public calcolaOrdineTitolo(annoTitolo: string): string{
    let esito = 900000;
    if(!isNaN(parseInt(annoTitolo))){
      while(annoTitolo.length < 6)
        annoTitolo = annoTitolo + '9';
      const parsedAnno = parseInt(annoTitolo);
      esito -= parsedAnno;
    }
    return String(esito);
  }

  public calcolaOrdineCard(annoCreazione: string | undefined, index: number): string{
    let esito = 900000;
    if(annoCreazione && !isNaN(parseInt(annoCreazione))){
      while(annoCreazione.length < 6)
        annoCreazione = annoCreazione + '0';
      const parsedAnno = parseInt(annoCreazione) + index;
      esito -= parsedAnno;
    }else{
      esito += index + 1;
    }
    return String(esito);
  }

  protected readonly parseInt = parseInt;
  protected readonly isNaN = isNaN;
}
