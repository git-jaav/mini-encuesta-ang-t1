import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { EncuestaPersonaRespuestaService } from '../../_service/encuesta-persona-respuesta.service';
import { MeEncuestaPersonaRespuesta } from '../../_model/MeEncuestaPersonaRespuesta';
import { CODIGO_ENCUESTA_DEF } from '../../_shared/constants';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  dataSource:MatTableDataSource<MeEncuestaPersonaRespuesta>;
  totalElementos: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'Ap_pat', 'Ap_mat', 'Correo','fecha', 'acciones'];

  constructor(
    private encuestaPersonaRespuestaService: EncuestaPersonaRespuestaService
  ) { 
    this.dataSource = new MatTableDataSource<MeEncuestaPersonaRespuesta>();    
  }

  ngOnInit() {
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
        console.log('CCCCC::'+registros[0]);
        this.dataSource = new MatTableDataSource<MeEncuestaPersonaRespuesta>(registros);
        this.totalElementos = registros[0].contadorTotal;  
      }
      if(!desdePaginador){
        this.dataSource.paginator = this.paginator;
      }
    });
  }  

  openDialog() {
    
  }

}
