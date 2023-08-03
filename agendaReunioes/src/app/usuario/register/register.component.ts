import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { FormGroup, FormControl} from '@angular/forms';
import { Validators, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { matchValidator } from './matchValidator';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { User } from "../../models/user.model"
import { UserService } from '../../service/user.service'
import { ErrorService } from 'src/app/service/ErrorService.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit  {
  isFormSubmitted = false;

  public user!: User;
  public formulario: FormGroup;

  public usuario!: User;
  public idUsuario: any;

  public permissoes = [
    {name: 'Administrador', valor: '0'},
    {name: 'Usuário administrativo', valor: '1'},
    {name: 'Usuário comum', valor: '2'}];

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idUsuario = params.get('id');
    });
    if (this.idUsuario !== null) {
      const passwordControl = this.formulario.get('password');
      if (passwordControl) {
        passwordControl.clearValidators();
        passwordControl.updateValueAndValidity();
      }
      
      const confirmPasswordControl = this.formulario.get('password_confirmation');
      if (confirmPasswordControl) {
        confirmPasswordControl.clearValidators();
        confirmPasswordControl.updateValueAndValidity();
      }

      this.userService.getUsuario(this.idUsuario)
        .subscribe((user: User) =>{
          this.usuario = user;
          this.formulario.patchValue({
            'name': this.usuario['name'],
            'userName': this.usuario['userName'],
            'email': this.usuario['email'],
            'ramal': this.usuario['ramal'],
            'nivelPermissao': this.usuario['nivelPermissao']
          });
        },(error: any) => {
          this.errorService.erro(error);
        });
    }
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private errorService: ErrorService
  ) {
      this.formulario = new FormGroup({
        'name': new FormControl(null, [Validators.required]),
        'userName': new FormControl(null, [Validators.required, Validators.minLength(8)], this.checkUniqueUsername(this.userService)),
        'email': new FormControl(null, [Validators.required, Validators.email],  this.checkUniqueEmail(this.userService)),
        'ramal': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')]),
        'nivelPermissao': new FormControl(null, [Validators.required]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(8), matchValidator('password_confirmation', true)]),
        'password_confirmation': new FormControl(null, [Validators.required, matchValidator('password')])
      });

    }

  // Função de validação assíncrona para verificar a unicidade do username
  public checkUniqueUsername(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const userName = control.value;
      if (this.usuario && userName === this.usuario.userName) {
        return of(null);
      }
      return userService.verificarUsernameExistente(userName).pipe(
        map(exists => exists ? { 'usernameTaken': true } : null)
      );

    };
  }

  // Função de validação assíncrona para verificar a unicidade do email
  private checkUniqueEmail(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value;
      if (this.usuario && email === this.usuario.email) {
        return of(null);
      }
      return userService.verificarEmailExistente(email).pipe(
        map(exists => exists ? { 'emailTaken': true } : null)
      );
    };
  }

  public cadastrarUsuario(): void {
    this.isFormSubmitted = true;
    if (this.formulario.valid) {
      let usuario: User = new User(
        this.formulario.value.name,
        this.formulario.value.userName,
        this.formulario.value.email,
        this.formulario.value.ramal,
        this.formulario.value.nivelPermissao,
        this.formulario.value.password,
        this.formulario.value.password_confirmation
      )

      if (this.idUsuario === null) {
        this.userService.cadastrarUsuario(usuario).subscribe({
          next: () => {
            this.router.navigate(['/usuario']);
          },
          error: (error) => {
            this.errorService.erro(error);
          }
        });
      } else {
        usuario.id = this.idUsuario;
        if (this.formulario.valid) {
          this.userService.editarUsuario(usuario).subscribe({
            next: () => {
              this.router.navigate(['/usuario']);
            },
            error: (error: any) => {
              this.errorService.erro(error);
            }
          });
        }
      }
    }
  }
}

