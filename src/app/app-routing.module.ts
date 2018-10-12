import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { TemaComponent } from './pages/tema/tema.component';
import { EncuestaRegistroComponent } from './pages/encuesta/encuesta-registro/encuesta-registro.component';

const routes: Routes = [
  {path: 'encuesta', component: EncuestaComponent},
  {path: 'temas', component: TemaComponent},
  {path: 'encuesta/registro', component: EncuestaRegistroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
