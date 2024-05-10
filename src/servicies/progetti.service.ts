import { Injectable } from '@angular/core';
import {ProgettiServiceMetadataModel} from "../models/ProgettiServiceModel";
import {RestService} from "./rest.service";

@Injectable({
  providedIn: 'root'
})
export class ProgettiService {
  constructor(private _restService: RestService) {}

  public async getListaProgetti(): Promise<string[]>{
    const esito: string[] = [];

    try {
      const response = await this._restService.get<string[]>(`/API/Progetti.php`);
      if(response)
        esito.push(...response);
    }catch (e){
      console.error("Non é stato possibile recuperare la lista dei progetti", String(e));
    }

    return esito;
  }

  public async getMetadataProgetto(nomeProgetto: string): Promise<ProgettiServiceMetadataModel>{
    let esito: ProgettiServiceMetadataModel = {nome: nomeProgetto};

    try{
      const response = await this._restService.getXML<ProgettiServiceMetadataModel>(`/Progetti/${nomeProgetto}/metadata.txt`);
      if(response)
        esito = response;
    }catch (e){
      console.error("Non é stato possibile recuperare i metadati del progetto", String(e));
    }

    return esito;
  }
}
