import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { TemaComponent } from './pages/tema/tema.component';
import { EncuestaRegistroComponent } from './pages/encuesta/encuesta-registro/encuesta-registro.component';
import { SecurityComponent } from './pages/security/security.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { GuardService } from './_service/guard.service';

/**
 * Ruteo para el manejo de las paginas
 * Caso espececial el ** valido para el redireccionamiento por sesion, etc.
 * */ 
const routes: Routes = [
  {path: 'encuesta', component: EncuestaComponent, canActivate: [GuardService]},
  {path: 'temas', component: TemaComponent, canActivate: [GuardService]},
  {path: 'encuesta/registro', component: EncuestaRegistroComponent, canActivate: [GuardService]},
  {path: 'security', component: SecurityComponent},
  {path: 'logout', component: LogoutComponent},
  {path: '**', redirectTo: 'security', pathMatch: 'full'}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
