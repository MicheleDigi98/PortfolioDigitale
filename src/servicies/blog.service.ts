import {Injectable} from "@angular/core";
import {RestService} from "./rest.service";
import {ProgettiServiceMetadataModel} from "../models/ProgettiServiceModel";
import BlogServiceMetadataModel from "../models/BlogServiceModel";

@Injectable({
  providedIn: 'root'
})
export class BlogService{
  constructor(private _restService: RestService) {}

  public async getListaBlog(): Promise<string[]>{
    const esito: string[] = [];

    try {
      const response = await this._restService.get<string[]>(`/API/Blog.php`);
      if(response)
        esito.push(...response);
    }catch (e){
      console.error("Non é stato possibile recuperare la lista dei progetti", String(e));
    }

    return esito;
  }

  public async getMetadataBlog(nomeBlog: string): Promise<BlogServiceMetadataModel>{
    let esito: BlogServiceMetadataModel = {nome: nomeBlog};

    try{
      const response = await this._restService.getXML<BlogServiceMetadataModel>(`/Blog/${nomeBlog}/metadata.txt`);
      if(response)
        esito = response;
    }catch (e){
      console.error("Non é stato possibile recuperare i metadati del blog", String(e));
    }

    return esito;
  }

  public async getTemplateBlog(metadataBlog: BlogServiceMetadataModel): Promise<string>{
    let esito = "Template non caricato..."

    try{
      const response = await this._restService.getXML<string>(`${metadataBlog.path}/${metadataBlog.template}`, undefined, false);
      if(response)
        esito = response;
    }catch (e){
      console.error("Non é stato possibile recuperare i metadati del blog", String(e));
    }

    return esito;
  }
}
