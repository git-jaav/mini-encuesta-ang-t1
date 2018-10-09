import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { CODIGO_ENCUESTA_DEF } from '../../_shared/constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EncuestaTemaService } from '../../_service/encuesta-tema.service';
import { MeEncuestaTema } from '../../_model/MeEncuestaTema';

@Component({
  selector: 'navegador-main',
  templateUrl: './navegador-main.component.html',
  styleUrls: ['./navegador-main.component.css']
})
export class NavegadorMainComponent implements OnInit {

  tema : MeEncuestaTema;
  tituloPrincipal : string;
  fechaActualStr : string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(
    private breakpointObserver: BreakpointObserver,
    private temaService: EncuestaTemaService,
  ) {}
    
  ngOnInit() {    
    this.inicializarValores();
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
  }

}
