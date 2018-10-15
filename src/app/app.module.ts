import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NavegadorMainComponent } from './pages/navegador-main/navegador-main.component';
import { LayoutModule } from '@angular/cdk/layout';

import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TemaComponent } from './pages/tema/tema.component';
import { EncuestaRegistroComponent } from './pages/encuesta/encuesta-registro/encuesta-registro.component';

import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { TokenInterceptorService } from './_service/token-interceptor.service';
import { LogoutComponent } from './pages/logout/logout.component';
import { SecurityComponent } from './pages/security/security.component';

@NgModule({
  declarations: [
    AppComponent,
    NavegadorMainComponent,
    EncuestaComponent,
    TemaComponent,
    EncuestaRegistroComponent,
    LogoutComponent,
    SecurityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    LayoutModule,

    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    { provide: LocationStrategy, useClass: PathLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
