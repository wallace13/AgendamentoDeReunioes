import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissaoService {

  constructor() { }

  getNivelPermissao(): string {
    const nivelPermissao = localStorage.getItem('nivelPermissao');
    return nivelPermissao ? nivelPermissao : ''; 
  }
}
