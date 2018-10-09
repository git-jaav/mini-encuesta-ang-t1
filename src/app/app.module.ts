import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NavegadorMainComponent } from './pages/navegador-main/navegador-main.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TemaComponent } from './pages/tema/tema.component';

@NgModule({
  declarations: [
    AppComponent,
    NavegadorMainComponent,
    EncuestaComponent,
    TemaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
