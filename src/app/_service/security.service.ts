import { Injectable } from '@angular/core';
import { HOST_BACKEND, PARAM_USUARIO, URL_LOGOUT_AWS, CODE_ROLE_ADMIN } from '../_shared/constants';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {

  urlOauth: string = `${HOST_BACKEND}/api/security/token`;

  constructor(
    private http: HttpClient,
    private location: Location)  { }

  validarToken() {
    return this.http.post(this.urlOauth, "");
  }

  cerrarSesion() {
    sessionStorage.clear();
    setTimeout(()=> {
      window.location.href=`${URL_LOGOUT_AWS}${location.protocol}//${location.host}/security`;;
      /*
      if(location.host.indexOf('wjma90.com')>0){
        let URL_DOMAIN = 'https://auth.wjma90.com';
        window.location.href=`${URL_DOMAIN}${location.protocol}//${location.host}/security`;;
      }else{
        window.location.href=`${URL_LOGOUT_AWS}${location.protocol}//${location.host}/security`;;
      }*/
    },500);
  }

  esRoleAdmin(){
    let usuario = JSON.parse(sessionStorage.getItem(PARAM_USUARIO));
    let rpta = false;
    if(usuario.authorities !== null) {
      usuario.authorities.forEach(element => {
        if(element.authority == CODE_ROLE_ADMIN){   
          rpta = true;
        }
      });
    }
    return rpta;
  }
}
