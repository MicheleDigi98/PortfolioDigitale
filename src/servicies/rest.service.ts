import {Injectable} from "@angular/core";

export type Data = {[key: string]: any};

@Injectable({
  providedIn: 'root'
})
export class RestService{
  private async _basicMethod<T = Data>(method: 'get' | 'post' | 'put' | 'delete', endpoint: string, data?: Data): Promise<T | false>{
    let esito: T | false = false;

    const headers = {
      'Content-Type': 'application/json',
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {method, headers, body: JSON.stringify(data)});
      if(response && response.ok){
        esito = (await response.json()) as T;
      }
    }catch (e){
      console.error("Errore invocazione metodo", method, e);
    }

    return esito;
  }

  private _basicMethodXMLHTTP<T = Data>(method: 'get' | 'post' | 'put' | 'delete', endpoint: string, data?: Data): Promise<T | false>{
    return new Promise<T | false>(resolve => {
      let esito: T | false = false;

      const headers = {}

      const xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.addEventListener('readystatechange', () => {
        if(xmlHttpRequest.readyState === 4 ) {
          if(xmlHttpRequest.status === 200){
            try{
              const jsonObject = JSON.parse(xmlHttpRequest.responseText);
              resolve(jsonObject);
            } catch (e){
              console.error("Errore invocazione metodo", method, e);
              resolve(esito);
            }
          }else{
            resolve(esito);
          }
        }
      })

      xmlHttpRequest.open(method.toUpperCase(), `${this.baseUrl}${endpoint}`);
      for(const header in headers)
        xmlHttpRequest.setRequestHeader(header, headers[header as keyof typeof headers]);
      xmlHttpRequest.send(JSON.stringify(data || {}));
    });
  }

  public get<T = Data>(endpoint: string, data?: Data): Promise<T | false> {
    return this._basicMethod<T>('get', endpoint, data);
  }

  public getXML<T = Data>(endpoint: string, data?: Data): Promise<T | false> {
    return this._basicMethodXMLHTTP<T>('get', endpoint, data);
  }

  public put<T = Data>(endpoint: string, data?: Data): Promise<T | false> {
    return this._basicMethod<T>('put', endpoint, data);
  }

  public putXML<T = Data>(endpoint: string, data?: Data): Promise<T | false> {
    return this._basicMethodXMLHTTP<T>('put', endpoint, data);
  }

  public post<T = Data>(endpoint: string, data?: Data): Promise<T | false> {
    return this._basicMethod<T>('post', endpoint, data);
  }

  public postXML<T = Data>(endpoint: string, data?: Data): Promise<T | false> {
    return this._basicMethodXMLHTTP<T>('post', endpoint, data);
  }

  public delete<T = Data>(endpoint: string, data?: Data): Promise<T | false> {
    return this._basicMethod<T>('delete', endpoint, data);
  }

  public deleteXML<T = Data>(endpoint: string, data?: Data): Promise<T | false> {
    return this._basicMethodXMLHTTP<T>('delete', endpoint, data);
  }

  public get baseUrl(): string{
    let esito = "";

    if(window.location.href.includes('localhost')){
      esito = 'http://localhost/BackendBIGCompany'
    }

    return esito;
  }
}