import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { User } from "../models/user.model"
import { Router } from '@angular/router';
import { UserService } from '../service/user.service'
import { ErrorService } from '../service/ErrorService.service';
import { NoAuthGuard } from '../service/no-auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [NoAuthGuard]
})
export class LoginComponent implements OnInit {

  public erroLogin!: string;
  ngOnInit() {
  }
  constructor(
    private userService: UserService,
    private router: Router,
    private errorService: ErrorService
  ) { }

  public formulario: FormGroup = new FormGroup({
    'userName': new FormControl(null),
    'password': new FormControl(null)
  })
  public login(): void{
    let userName = this.formulario.value.userName;
    let senha = this.formulario.value.password;

    const user = User.fromCredentials(userName, senha);

    this.userService.logarUsuario(user).subscribe({
      next: (resultado: any) => {
        this.userService.token_id = resultado.token
        localStorage.setItem('idToken', resultado.token)
        localStorage.setItem('usuarioLogado', resultado.user.id)
        localStorage.setItem('name', resultado.user.name)
        localStorage.setItem('nivelPermissao', resultado.user.nivelPermissao)
        this.router.navigate(['/'])
      },
      error: (erro) => {
        if (erro.status === 401) {
          this.erroLogin = erro.status;
        } else {
          this.errorService.erro(erro);
        }
      }
    });
  }

}

