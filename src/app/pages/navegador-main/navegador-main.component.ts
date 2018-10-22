import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { CODIGO_ENCUESTA_DEF, COD_OK } from '../../_shared/constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EncuestaTemaService } from '../../_service/encuesta-tema.service';
import { MeEncuestaTema } from '../../_model/MeEncuestaTema';
import { SecurityService } from '../../_service/security.service';

@Component({
  selector: 'navegador-main',
  templateUrl: './navegador-main.component.html',
  styleUrls: ['./navegador-main.component.css']
})
export class NavegadorMainComponent implements OnInit {

  tema : MeEncuestaTema;
  tituloPrincipal : string;
  usuarioActual : string;
  fechaActualStr : string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(
    private breakpointObserver: BreakpointObserver,
    private temaService: EncuestaTemaService,
    private serviceSecurity: SecurityService
  ) {}
    
  ngOnInit() {    
    /**set Modo actual*/
    this.inicializarValores();
    this.serviceSecurity.seguridadReferenciaBS.subscribe(seguridadoCheck => {          
      if(seguridadoCheck != null && seguridadoCheck == COD_OK ){
        this.inicializarValores();
      }else{
        
      }      
    });    
    
  }
  
  
  /** Cargar valores Default */
  inicializarValores() {    
    this.temaService.obtenerPorId(CODIGO_ENCUESTA_DEF)
    .subscribe((data) => {
      this.tema = data;
      if(this.tema != null){
        this.tituloPrincipal  = this.tema.enteTema;
      }      
    });

    this.usuarioActual = this.serviceSecurity.getCodigoUsuario();
  }

}
