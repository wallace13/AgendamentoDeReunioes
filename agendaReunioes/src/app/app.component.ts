import { Component, OnInit } from '@angular/core';
import { UserDataService } from './service/userDataService';
import { ErrorService } from './service/ErrorService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public usuarioLogado!: any;
  
  constructor(
    private userDataService: UserDataService, 
    private errorService: ErrorService
  ) { }

  title = 'agendaReunioes';
  exibeHeader() {
    const token = localStorage.getItem('idToken');
    return token !== null;
  }
  ngOnInit() {
    this.userDataService.getUsuarioLogado().subscribe(usuario => {
      this.usuarioLogado = usuario;
    },(error: any) => {
      this.errorService.erro(error);
    });
  }

}
