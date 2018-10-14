import { Injectable } from '@angular/core';
import { HOST_BACKEND } from '../_shared/constants';
import { Subject, BehaviorSubject,  } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MeEncuestaPersonaRespuesta } from '../_model/MeEncuestaPersonaRespuesta';


@Injectable({
  providedIn: 'root'
})
export class EncuestaPersonaRespuestaService {

  urlSevice: string = `${HOST_BACKEND}/api/encuestapersrespuesta`;
  mensajeRegistro = new Subject<string>();

  mensajeRegistroBS = new BehaviorSubject<number>(0);
  currentMessage = this.mensajeRegistroBS.asObservable();

  constructor(private httpClient: HttpClient) { }

  obtenerPorId(id : number) {    
    return this.httpClient.get<MeEncuestaPersonaRespuesta[]>(
    `${this.urlSevice}/id/${id}`);
}

  obtenerRegistrosPorEncuesta(codigoEncuesta : string, 
          page: number, size: number) {    
    return this.httpClient.get<MeEncuestaPersonaRespuesta[]>(
      `${this.urlSevice}/listar/pag/${page}/${size}/${codigoEncuesta}`);
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
