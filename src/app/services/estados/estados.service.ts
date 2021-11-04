import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  private API_SERVER = "http://localhost:8080/estados/";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllEstadosByPais(idPais: string): Observable<any> {
    return this.httpClient.get(this.API_SERVER + idPais);
  }
}
