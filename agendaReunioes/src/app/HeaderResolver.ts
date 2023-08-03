import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { UserService } from './service/user.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderResolver implements Resolve<User> {
  constructor(private userService: UserService) {}

  resolve(): Observable<User> {
    return this.userService.getUserLogado(); //informações do usuário logado
  }
}
