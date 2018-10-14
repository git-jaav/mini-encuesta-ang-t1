import { Component, OnInit, Input } from '@angular/core';
import { EncuestaPersonaRespuestaService } from '../../../_service/encuesta-persona-respuesta.service';
import {  Router } from '@angular/router';
import { SecurityService } from '../../../_service/security.service';
import { MeEncuestaPersonaRespuesta } from '../../../_model/MeEncuestaPersonaRespuesta';
import { MODO_NUEVO , MODO_EDITAR, MODO_VER} from '../../../_shared/constants';

@Component({
  selector: 'app-encuesta-registro',
  templateUrl: './encuesta-registro.component.html',
  styleUrls: ['./encuesta-registro.component.css']
})
export class EncuestaRegistroComponent implements OnInit {

  modoActual: string;
  enprId: number;
  objRegistro: MeEncuestaPersonaRespuesta;

  constructor(    
    private router: Router,
    private securityService: SecurityService,
    private encuestaPersonaRespuestaService: EncuestaPersonaRespuestaService
  ) { 
    this.objRegistro  = new MeEncuestaPersonaRespuesta();

  }

  ngOnInit() {
    //solo Admin
    if(this.securityService.esRoleAdmin()){
      this.encuestaPersonaRespuestaService.mensajeRegistroBS.subscribe(id => {    
        if(id != null && id != 0){
          /**CASO A: registro a partir del listado principal*/
          console.log('REGISTRO AA::'+this.enprId);
          this.encuestaPersonaRespuestaService.obtenerPorId(id).subscribe((data) => {
            this.enprId  = id;
            console.log('REGISTRO BB::'+data);        
          }); 
        }else{
          /**CASO B: registro a partir del usuario (Si existiese)*/
        }
      });
    }else{
      /**CASO B: registro a partir del usuario (Si existiese)*/
    }

  }

  cargarRegistroUsuarioActual() {

  }

  onSubmit() {
    this.objRegistro.enperFechaRegistro = new Date();
    if(this.modoActual == MODO_NUEVO){      
      this.encuestaPersonaRespuestaService.guardar(this.objRegistro).subscribe((data)=>{
          this.encuestaPersonaRespuestaService.mensajeRegistro.next('Se guardaron los cambios correctamente...');
      }, (error) => {
        this.encuestaPersonaRespuestaService.mensajeRegistro.next('Error al guardar...');
      });
    }else if(this.modoActual == MODO_EDITAR){

    }

  }

}
