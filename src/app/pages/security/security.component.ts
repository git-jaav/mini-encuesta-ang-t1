import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from '../../_service/security.service';
import { TOKEN_NAME, PARAM_USUARIO } from '../../_shared/constants';
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
      this.route.fragment.subscribe((fragment) => {
        let token;
        try{                  
          token = fragment.split('&')[0].split('=')[1];
        }catch(e){
          this.serviceSecurity.cerrarSesion();
        }
        console.log('TOKEN AA:::'+token);
        sessionStorage.setItem(TOKEN_NAME, token);
        this.serviceSecurity.validarToken().subscribe((data:any) => {
          sessionStorage.setItem(PARAM_USUARIO, JSON.stringify(data.body));
          console.log('TOKEN BBB:::'+data);
          this.router.navigate(['/encuesta']);
        });
    });
  }

}
