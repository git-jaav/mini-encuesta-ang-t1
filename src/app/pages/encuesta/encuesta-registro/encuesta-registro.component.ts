import { Component, OnInit, Input } from '@angular/core';
import { EncuestaPersonaRespuestaService } from '../../../_service/encuesta-persona-respuesta.service';
import {  Router } from '@angular/router';
import { SecurityService } from '../../../_service/security.service';
import { MeEncuestaPersonaRespuesta } from '../../../_model/MeEncuestaPersonaRespuesta';
import { MODO_NUEVO , MODO_EDITAR, MODO_VER , CODIGO_ENCUESTA_DEF,ESTADO_ACTIVO_db } from '../../../_shared/constants';
import { isEmpty } from '../../../../../node_modules/rxjs/operators';
import { EncuestaAlternativaService } from '../../../_service/encuesta-alternativa.service';
import { MeEncuestaAlternativa } from '../../../_model/MeEncuestaAlternativa';

@Component({
  selector: 'app-encuesta-registro',
  templateUrl: './encuesta-registro.component.html',
  styleUrls: ['./encuesta-registro.component.css']
})
export class EncuestaRegistroComponent implements OnInit {

  loadSpinerVisible: boolean;
  componentReadOnly: boolean;
  modoNew: boolean;
  modoUpdate: boolean;
  modoView: boolean;

  modoActual: string;
  enprId: number;
  objRegistro: MeEncuestaPersonaRespuesta;
  listaEncuestaAlternativas: MeEncuestaAlternativa[] = [];

  constructor(    
    private router: Router,
    private securityService: SecurityService,
    private encuestaPersonaRespuestaService: EncuestaPersonaRespuestaService,
    private encuestaAlternativaService: EncuestaAlternativaService
  ) { 
    this.objRegistro  = new MeEncuestaPersonaRespuesta();
    this.modoActual = ""+MODO_NUEVO;
    this.loadSpinerVisible = false;
    this.componentReadOnly = false;
  }

  ngOnInit() {
    /**cargar alternativas */
    this.cargarListaAlternativas();

    /**set Modo actual*/
    this.encuestaPersonaRespuestaService.mdodoReferenciaBS.subscribe(modo => {          
      if(modo != null && modo != ""){
        //this.modoActual = ""+modo;
        this.modoActual = MODO_NUEVO;     
      }else{
        this.modoActual = MODO_NUEVO;        
      }      

    });

    /**Set ReadOnly*/
    this.iniciarComponentReadOnly();
          /**set Registro*/
          this.inicializarRegistro();

          console.log("TRACE XXX:::ngOnInit");         
  }

  iniciarComponentReadOnly(){
    if(this.modoActual != null && this.modoActual != ""){
      if(this.modoActual ==  MODO_NUEVO){
        this.componentReadOnly = false;
        this.modoNew=true;
        this.modoUpdate=false;
        this.modoView=false;
      }else if(this.modoActual ==  MODO_EDITAR){
        this.componentReadOnly = false;
        this.modoNew=false;
        this.modoUpdate=true;
        this.modoView=false;
      }else if(this.modoActual ==  MODO_VER){
        this.componentReadOnly = true;
        this.modoNew=false;
        this.modoUpdate=false;
        this.modoView=true;
      }else{
        this.componentReadOnly = true;
        this.modoNew=false;
        this.modoUpdate=false;
        this.modoView=false;
      }
    }else{
      this.componentReadOnly = true;
      this.modoNew=false;
      this.modoUpdate=false;
      this.modoView=false;
    }

    console.log("TRACE XXX:::  iniciarComponentReadOnly");       
  }


  inicializarRegistro(){
    //solo Admin
    console.log("TRACE XXX:::  inicializarRegistro");       
    if(this.securityService.esRoleAdmin()){
      this.encuestaPersonaRespuestaService.idReferenciaBS.subscribe(id => {            
        if(id != null && id != 0){
          /**CASO A: registro a partir del listado principal*/
          this.enprId  = id;
          this.encuestaPersonaRespuestaService.obtenerPorId(id).subscribe((data) => {
            //var dataJson = JSON.stringify(data);
            //let registro = JSON.parse(dataJson);                  
            let registro = data;
            if(registro != null){
              this.objRegistro = registro;
            }                        
          }); 
        }else{
          /**CASO B: registro a partir del usuario (Si existiese)*/
          this.cargarRegistroUsuarioActual();
        }
      });
    }else{
      /**CASO B: registro a partir del usuario (Si existiese)*/
      this.cargarRegistroUsuarioActual();
    }
  }

  cargarListaAlternativas() {
    console.log("TRACE XXX:::  cargarListaAlternativas");       
    this.listaEncuestaAlternativas = [];
    this.encuestaAlternativaService.obtenerRegistrosPorEncuesta(CODIGO_ENCUESTA_DEF).subscribe((datos) => {
      var dataJson = JSON.stringify(datos);
      let registros = JSON.parse(dataJson);      
      if(registros != null && registros.length > 0){
        this.listaEncuestaAlternativas = registros;                   
      }
    });
  }


  /**Cargar Registro de Encuesta por CODIGO DE USUARIO ACTUAL*/ 
  cargarRegistroUsuarioActual() {
    console.log("TRACE XXX:::  cargarRegistroUsuarioActual");     
    var codigoUsuarioActual = this.securityService.getCodigoUsuario();
    this.encuestaPersonaRespuestaService.obtenerPorCodigoUsuarioPorEncuesta(
      codigoUsuarioActual,CODIGO_ENCUESTA_DEF).subscribe((data) => {                
      let registro = data;
      if(registro != null){
        this.objRegistro = registro;
        if(this.securityService.esRoleAdmin()){
          //this.modoActual = MODO_EDITAR;
          this.modoActual = MODO_NUEVO;
        }else{
          this.modoActual = MODO_VER;
        }
        /**Set ReadOnly*/
        this.iniciarComponentReadOnly();
      }            
      //console.log('REGISTRO YYY::'+data);        
    }); 
  }

  onSubmit() {
    console.log("TRACE XXX:::  onSubmit");     
    this.loadSpinerVisible = true;
    console.log("REG: modoActual:  "+this.modoActual); 
    console.log("REG: data:  "+this.objRegistro); 
    console.log("REG: event:  "+event); 
    //this.objRegistro = event;
    if(this.modoActual == MODO_NUEVO){ 
      this.setDefaultRegistroNuevo();     
      this.encuestaPersonaRespuestaService.guardar(this.objRegistro).subscribe((data)=>{
          this.encuestaPersonaRespuestaService.mensajeRegistro.next('Se guardaron los cambios correctamente...');
          this.loadSpinerVisible = false;   
          //console.log("REG: INFO:  "+data);             
          this.inicializarRegistro();
      }, (error) => {
        alert("Sucedió un Error al guardar...");
        //this.encuestaPersonaRespuestaService.mensajeRegistro.next('Error al guardar...');
        this.loadSpinerVisible = false;        
      });
    }else if(this.modoActual == MODO_EDITAR){
      this.setNombreCompletoRegistro();
      this.encuestaPersonaRespuestaService.actualizar(this.objRegistro).subscribe((data)=>{
        this.encuestaPersonaRespuestaService.mensajeRegistro.next('Se actualizaron los cambios correctamente...');
        this.loadSpinerVisible = false; 
        if(this.securityService.esRoleAdmin()){
          this.router.navigate(['/encuesta']);
        }           
      }, (error) => {
        alert("Sucedió un Error al actualizar los datos...");
        //this.encuestaPersonaRespuestaService.mensajeRegistro.next('Error al guardar...');        
        this.loadSpinerVisible = false;
      });
    }

  }

  setDefaultRegistroNuevo() {
    console.log("TRACE XXX:::  setDefaultRegistroNuevo");     
    if(this.objRegistro != null){
      this.objRegistro.enperFechaRegistro = new Date();
      this.objRegistro.enperEstado = ESTADO_ACTIVO_db;
      this.setNombreCompletoRegistro();
      this.objRegistro.enperCodigoUsuario = this.securityService.getCodigoUsuario();
    }
  }

  setNombreCompletoRegistro() {
    this.objRegistro.enperNombrecompleto = 
    this.objRegistro.enperApellidoPaterno + " " +
    this.objRegistro.enperApellidoMaterno + ", " +
    this.objRegistro.enperApellidoNombres ;    
  }

  cancelarRegistro() {
    console.log("TRACE XXX:::  cancelarRegistro");     
    if(this.securityService.esRoleAdmin()){
      this.router.navigate(['/encuesta']);
    }               
  }
  
}
