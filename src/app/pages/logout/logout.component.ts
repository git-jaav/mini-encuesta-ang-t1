import { Component, OnInit } from '@angular/core';
import { CODE_ROLE_ADMIN } from 'src/app/_shared/constants';
import { SecurityService } from '../../_service/security.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private serviceSecurity: SecurityService) { }

  ngOnInit() {
    this.serviceSecurity.cerrarSesion();
  }

}
