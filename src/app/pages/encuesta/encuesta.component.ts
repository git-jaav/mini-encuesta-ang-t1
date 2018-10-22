import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { EncuestaPersonaRespuestaService } from '../../_service/encuesta-persona-respuesta.service';
import { MeEncuestaPersonaRespuesta } from '../../_model/MeEncuestaPersonaRespuesta';
import { CODIGO_ENCUESTA_DEF, MODO_EDITAR } from '../../_shared/constants';
import {  Router } from '@angular/router';
import { SecurityService } from '../../_service/security.service';


@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  dataSource:MatTableDataSource<MeEncuestaPersonaRespuesta>;
  totalElementos: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'Nombre_completo', 'Cod_Usuario', 'Correo','fecha', 'acciones'];

  constructor(    
    private router: Router,
    private serviceSecurity: SecurityService,
    private encuestaPersonaRespuestaService: EncuestaPersonaRespuestaService
  ) { 
    this.dataSource = new MatTableDataSource<MeEncuestaPersonaRespuesta>();    
  }

  ngOnInit() {
    /*
    var esAdmin = this.serviceSecurity.esRoleAdmin();
    if(!esAdmin){
      //this.el.nativeElement.style.display = 'none';
    } */      
    this.cargarTabla(0, 50, false);   
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
    
  mostrarMas(event){
    this.cargarTabla(event.pageIndex, event.pageSize, true);
  }

  cargarTabla(pageIndex: number, pageSize: number, desdePaginador: boolean){
    this.encuestaPersonaRespuestaService
    .obtenerRegistrosPorEncuesta(CODIGO_ENCUESTA_DEF,pageIndex,pageSize).subscribe((datos) => {
      var dataJson = JSON.stringify(datos);
      let registros = JSON.parse(dataJson);      
      if(registros != null && registros.length > 0){        
        this.dataSource = new MatTableDataSource<MeEncuestaPersonaRespuesta>(registros);
        this.totalElementos = registros[0].contadorTotal;  
      }
      if(!desdePaginador){
        this.dataSource.paginator = this.paginator;
      }
    });
  }  

  eliminarRegistro(id: number) {
    this.encuestaPersonaRespuestaService.eliminar(id).subscribe((data) => {
      this.encuestaPersonaRespuestaService.mensajeRegistro.next('Dato eliminado correctamente...');
      this.refrescarListado();   
    });
  }
  
  editarRegistro(id: number) {
    
    this.encuestaPersonaRespuestaService.idReferenciaBS.next(id);
    this.encuestaPersonaRespuestaService.mdodoReferenciaBS.next(MODO_EDITAR);
    this.router.navigate(['/encuesta/registro']);
      /*
    this.encuestaPersonaRespuestaService.obtenerPorId(id).subscribe((data) => {
      console.log('editarRegistro::'+id);
      this.encuestaPersonaRespuestaService.mensajeRegistroBS.next(id);
      this.router.navigate(['/encuesta/registro']);
    }); */               
  }  

  
  refrescarListado() {
    this.cargarTabla(0, 50, false);   
  }
  openDialog() {
    
  }

}
