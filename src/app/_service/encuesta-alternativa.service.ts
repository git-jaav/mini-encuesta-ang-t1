import { Injectable } from '@angular/core';
import { HOST_BACKEND } from '../_shared/constants';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MeEncuestaAlternativa } from '../_model/MeEncuestaAlternativa';
import { api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncuestaAlternativaService {

  //urlSevice: string = `${HOST_BACKEND}/api/encuestaalternativa`;
  urlSevice: string = `${api.domain_api}alternativa/tema`;
  mensajeRegistro = new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  obtenerRegistrosPorEncuesta(codigoEncuesta : string) {
    return this.httpClient.get<MeEncuestaAlternativa[]>(`${this.urlSevice}/${codigoEncuesta}`);
  }

}
