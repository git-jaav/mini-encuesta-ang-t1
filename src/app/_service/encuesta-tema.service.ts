import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HOST_BACKEND } from '../_shared/constants';
import { Subject, BehaviorSubject } from 'rxjs';
import { MeEncuestaTema } from '../_model/MeEncuestaTema';
import { api } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EncuestaTemaService {

  //urlSevice: string = `${HOST_BACKEND}tema`;  
  urlSevice: string = `${api.domain_api}tema`;  
  constructor(private httpClient: HttpClient) { }


  obtenerPorId(codigoEncuesta : string) {
    return this.httpClient.get<MeEncuestaTema>(`${this.urlSevice}/id/${codigoEncuesta}`);
  }

  obtenerRegistros() {
    return this.httpClient.get<MeEncuestaTema[]>(`${this.urlSevice}/`);
  }

}
