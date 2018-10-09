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
    this.totalElementos = 10; //HARD **
  }

  ngOnInit() {
    this.cargarTabla(0, 100, false);
  }

  mostrarMas(event){
    this.cargarTabla(event.pageIndex, event.pageSize, true);
  }

  cargarTabla(pageIndex: number, pageSize: number, desdePaginador: boolean){
    this.encuestaPersonaRespuestaService.obtenerRegistrosPorEncuesta(CODIGO_ENCUESTA_DEF).subscribe((datos) => {
      let registros = JSON.parse(JSON.stringify(datos)).content;
      this.dataSource = new MatTableDataSource<MeEncuestaPersonaRespuesta>(registros);

      if(!desdePaginador){
        this.dataSource.paginator = this.paginator;
      }
    });
  }  
}
