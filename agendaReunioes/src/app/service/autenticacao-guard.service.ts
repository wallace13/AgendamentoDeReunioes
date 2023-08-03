import { Injectable } from '@angular/core'
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot  } from '@angular/router'
import { UserService } from './user.service'
import { UserDataService } from './userDataService';
import { User } from '../models/user.model';

@Injectable()
export class AutenticacaoGuard implements CanActivate  {

    public usuarioLogado!: any;
    constructor(
      private router: Router,
      private userService: UserService,
      private userDataService: UserDataService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const roles = route.data['roles'] as Array<number>; // Obtém as permissões
      const nivelPermissao = localStorage.getItem('nivelPermissao');

      if (nivelPermissao !== null && roles && roles.includes(parseInt(nivelPermissao, 10))) {
        this.userService.getUserLogado().subscribe(
          (usuario: User) => {
            this.usuarioLogado = usuario;
            this.userDataService.setUsuarioLogado(usuario);
          },
          (error: any) => {
            if (error.status === 500) {
              this.router.navigate(['/error', { errorCode: 500 }]);
            } 
          }
        );
        
        return true; 
      }
      this.router.navigate(['/login']);
      return false;
    }
      
}
