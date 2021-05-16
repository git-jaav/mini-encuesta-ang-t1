import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from '../../_service/security.service';
import { TOKEN_NAME, PARAM_USUARIO, COD_OK, CODE_ROLE_ADMIN } from '../../_shared/constants';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class SecurityComponent implements OnInit {

  constructor(    
    private router: Router,
    private route: ActivatedRoute,
    private serviceSecurity: SecurityService,
    private location: Location) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      
      let token =  params['token'];
      try{         
        if(!token){
          token = PARAM_USUARIO;
        }

      }catch(e){
        this.serviceSecurity.cerrarSesion();
      }
      console.log("TOKEN : "+token);
      // segemento auxiliar
      if (token) {
        sessionStorage.setItem(CODE_ROLE_ADMIN, token);
        sessionStorage.setItem(TOKEN_NAME, token);
      } else {
        sessionStorage.setItem(CODE_ROLE_ADMIN, PARAM_USUARIO);
        sessionStorage.setItem(TOKEN_NAME, PARAM_USUARIO);
      }
      sessionStorage.setItem(TOKEN_NAME, token);

      if(this.serviceSecurity.esRoleAdminTemp()){
        this.router.navigate(['/encuesta']);
      }else{
        this.router.navigate(['/encuesta/registro']);
      }

  });

    /*this.route.fragment.subscribe((fragment) => {
      let token;
      try{         
        console.log("TOKEN fragment "+fragment);
        if(fragment){
          token = fragment.split('&')[0].split('=')[1];
        }else {
          token = PARAM_USUARIO;
        }

      }catch(e){
        this.serviceSecurity.cerrarSesion();
      }
      console.log("TOKEN AAAA "+token);
      // segemento auxiliar
      if (token) {
        sessionStorage.setItem(CODE_ROLE_ADMIN, token);
        sessionStorage.setItem(TOKEN_NAME, token);
      } else {
        sessionStorage.setItem(CODE_ROLE_ADMIN, PARAM_USUARIO);
        sessionStorage.setItem(TOKEN_NAME, PARAM_USUARIO);
      }
      sessionStorage.setItem(TOKEN_NAME, token);

      if(this.serviceSecurity.esRoleAdminTemp()){
        this.router.navigate(['/encuesta']);
      }else{
        this.router.navigate(['/encuesta/registro']);
      }

      // temp
      
      this.serviceSecurity.validarToken().subscribe((data:any) => {
        var credential =  JSON.parse(JSON.stringify(data.body));
        sessionStorage.setItem(PARAM_USUARIO,  JSON.stringify(data.body));
        //console.log('TOKEN BBB:::'+ data.body);
        this.serviceSecurity.seguridadReferenciaBS.next(COD_OK);
        //pagina def
        if(this.serviceSecurity.esRoleAdmin()){
          this.router.navigate(['/encuesta']);
        }else{
          this.router.navigate(['/encuesta/registro']);
        }
        
      });
     

    });  */          
  }

}
