import {Injectable} from "@angular/core";
import {RestService} from "./rest.service";

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
}
