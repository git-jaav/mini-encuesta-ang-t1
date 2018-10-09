import { Injectable } from '@angular/core';
import { HOST_BACKEND } from '../_shared/constants';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MeEncuestaAlternativa } from '../_model/MeEncuestaAlternativa';

@Injectable({
  providedIn: 'root'
})
export class EncuestaAlternativaService {

  urlSevice: string = `${HOST_BACKEND}/api/encuestaalternativa`;
  mensajeRegistro = new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  obtenerRegistrosPorEncuesta(codigoEncuesta : string) {
    return this.httpClient.get<MeEncuestaAlternativa[]>(`${this.urlSevice}/listar/${codigoEncuesta}`);
  }

}
