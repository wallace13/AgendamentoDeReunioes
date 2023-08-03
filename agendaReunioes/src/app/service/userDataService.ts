import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserDataService {
  // Declaração do BehaviorSubject para armazenar o usuário logado
  private usuarioLogadoSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor() { }

  // Método para definir o usuário logado
  setUsuarioLogado(usuario: User | null) {
    this.usuarioLogadoSubject.next(usuario);
  }

  // Método para obter o usuário logado como um Observable
  getUsuarioLogado() {
    return this.usuarioLogadoSubject.asObservable();
  }
}
