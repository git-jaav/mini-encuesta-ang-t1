import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { TemaComponent } from './pages/tema/tema.component';
import { EncuestaRegistroComponent } from './pages/encuesta/encuesta-registro/encuesta-registro.component';
import { SecurityComponent } from './pages/security/security.component';
import { LogoutComponent } from './pages/logout/logout.component';

/**
 * Ruteo para el manejo de las paginas
 * Caso espececial el ** valido para el redireccionamiento por sesion, etc.
 * */ 
const routes: Routes = [
  {path: 'encuesta', component: EncuestaComponent},
  {path: 'temas', component: TemaComponent},
  {path: 'encuesta/registro', component: EncuestaRegistroComponent},
  {path: 'security', component: SecurityComponent},
  {path: 'logout', component: LogoutComponent},
  {path: '**', redirectTo: 'logout', pathMatch: 'full'}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
