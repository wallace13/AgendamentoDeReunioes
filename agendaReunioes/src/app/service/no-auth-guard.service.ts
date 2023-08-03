import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verifica se o usuário está logado
    const token = localStorage.getItem('idToken');
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    
    if (token !== null  && usuarioLogado !== null) {
      // Se estiver logado, redireciona para a página inicial ou para outra rota adequada
      this.router.navigate(['/']);
      return false;
    }
    // Permite o acesso à rota de login se o usuário não estiver logado
    return true;
  }
}
