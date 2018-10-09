import { Injectable } from '@angular/core';
import { HOST_BACKEND } from '../_shared/constants';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MeEncuestaPersonaRespuesta } from '../_model/MeEncuestaPersonaRespuesta';


@Injectable({
  providedIn: 'root'
})
export class EncuestaPersonaRespuestaService {

  urlSevice: string = `${HOST_BACKEND}/api/encuestapersrespuesta`;
  mensajeRegistro = new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  obtenerRegistrosPorEncuesta(codigoEncuesta : string) {
    return this.httpClient.get<MeEncuestaPersonaRespuesta[]>(`${this.urlSevice}/listar/${codigoEncuesta}`);
  }


  guardar(objDto: MeEncuestaPersonaRespuesta) {
    return this.httpClient.post(`${this.urlSevice}/guardar`, objDto);
  }

  actualizar(objDto: MeEncuestaPersonaRespuesta) {
    return this.httpClient.post(`${this.urlSevice}/actualizar`, objDto);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.urlSevice}/eliminar/${id}`);
  }

}
