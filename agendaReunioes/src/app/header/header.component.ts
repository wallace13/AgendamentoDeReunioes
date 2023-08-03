import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { UserDataService } from '../service/userDataService';
import { ErrorService } from '../service/ErrorService.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public usuarioLogado!: any;

  constructor(
    private router: Router,
    private usuario: UserService,
    private userDataService: UserDataService, 
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.userDataService.getUsuarioLogado().subscribe(usuario => {
      this.usuarioLogado = usuario;
    },(error: any) => {
      this.errorService.erro(error);
    });
  }
  logout(): void {
    this.usuario.logout();
    this.usuarioLogado = null;
  }
}
