import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../models/user.model';
import { UserSenha } from '../models/userSenha.model';
import { ErrorService } from '../service/ErrorService.service';
import { FormGroup, FormControl} from '@angular/forms';

import { Validators } from '@angular/forms';
import { matchValidator } from '../usuario/register/matchValidator';

declare var $: any; // Declaração para utilizar o jQuery

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{
  public usuarioLogado!: User;
  public isModalOpen: boolean = false;
  public formulario: FormGroup;
  isFormSubmitted = false;
  public erroSenha!: string;

  ngOnInit() {

    this.userService.getUserLogado()
      .subscribe((user: User) => {
        this.usuarioLogado = user;
      },(error: any) => {
        this.errorService.erro(error);
      });

  }
  constructor(
    private userService: UserService,
    private errorService: ErrorService,
  ) {
    this.formulario = new FormGroup({
      'current_password': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8), matchValidator('password_confirmation', true)]),
      'password_confirmation': new FormControl(null, [Validators.required, matchValidator('password')])
    });
  }

  open(usuario: any) {
    this.usuarioLogado = usuario;
    this.isModalOpen = true;
    $(".modal-backdrop").show();
    $(".modal").show();
  }

  closeModal() {
    this.isFormSubmitted = false;
    this.isModalOpen = false;
    this.formulario.reset();
    this.erroSenha = "";
    $(".modal-backdrop").hide();
    $(".modal").hide();
  }

  alterarSenha(idUsuario: any){
    this.isFormSubmitted = true;
    if (this.formulario.valid) {
      let usuario: UserSenha = new UserSenha(
        this.formulario.value.current_password,
        this.formulario.value.password,
        this.formulario.value.password_confirmation
      )
      usuario.id = idUsuario;
      this.userService.alterarSenha(usuario).subscribe({
        next: () => {
          this.closeModal();
        },
        error: (error) => {
          if (error.status === 422) {
            this.erroSenha = error.status;
          } else {
            this.errorService.erro(error);
          }
        }
      });
    }
  }

}
