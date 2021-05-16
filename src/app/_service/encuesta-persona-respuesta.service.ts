import { Injectable } from '@angular/core';
import { HOST_BACKEND } from '../_shared/constants';
import { Subject, BehaviorSubject,  } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MeEncuestaPersonaRespuesta } from '../_model/MeEncuestaPersonaRespuesta';
import { api } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EncuestaPersonaRespuestaService {

  //urlSevice: string = `${HOST_BACKEND}/api/encuestapersrespuesta`;
  urlSevice: string = `${api.domain_api}respuesta`;

  mensajeRegistro = new Subject<string>();
  idReferenciaBS = new BehaviorSubject<number>(0);  
  mdodoReferenciaBS = new BehaviorSubject<String>("");


  constructor(private httpClient: HttpClient) { }

  obtenerPorId(id : number) {    
    return this.httpClient.get<MeEncuestaPersonaRespuesta>(
    `${this.urlSevice}/id/${id}`);
  }

  obtenerRegistrosPorEncuesta(codigoEncuesta : string, 
          page: number, size: number) {    
    return this.httpClient.get<MeEncuestaPersonaRespuesta[]>(
      `${this.urlSevice}/pag/${page}/${size}/${codigoEncuesta}`);
  }

  obtenerPorCodigoUsuarioPorEncuesta(codigoUsuario : string, 
    codigoEncuesta : string, ) {    
      return this.httpClient.get<MeEncuestaPersonaRespuesta>(
        `${this.urlSevice}/usuario/${codigoUsuario}/tema/${codigoEncuesta}`);
  }


  guardar(objDto: MeEncuestaPersonaRespuesta) {
    return this.httpClient.post(`${this.urlSevice}/`, objDto);
  }

  actualizar(objDto: MeEncuestaPersonaRespuesta) {
    return this.httpClient.post(`${this.urlSevice}/`, objDto);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.urlSevice}/id/${id}`);
  }

}
