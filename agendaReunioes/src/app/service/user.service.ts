import { Injectable } from '@angular/core'
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from "../models/user.model";
import { UserSenha } from '../models/userSenha.model';
import { URL_API } from '../app.api';
import { ErrorService } from './ErrorService.service';


@Injectable()
export class UserService{
  [key: string]: any;
  public token_id: string | null = null;
  public usuarioLogado!: User[];
  public nivelUserLogado!:any;
  public nameUserLogado!:any;

  constructor(private http: HttpClient, private router: Router, private errorService: ErrorService) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('idToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  public getUsuarios(): Observable<User[]> {
    const headers = this.getHeaders();
    return this.http.get<User[]>(`${URL_API}/user`,{headers}).pipe(
      map((resposta: User[]) => resposta)
    );
  }

  public getUserLogado(): Observable<any>{
    const headers = this.getHeaders();
    const userId = localStorage.getItem('usuarioLogado');
    return this.http.get(`${URL_API}/user/${userId}`,{headers});
  }

  public getUsuario(userId: string): Observable<any>{
    const headers = this.getHeaders();
    return this.http.get(`${URL_API}/user/${userId}`,{headers});
  }

  public getUserName(userName: string): Observable<any>{
    const headers = this.getHeaders();
    return this.http.get(`${URL_API}/userName/${userName}`,{headers});
  }

  public getEmail(email: string): Observable<any>{
    const headers = this.getHeaders();
    return this.http.get(`${URL_API}/email/${email}`,{headers});
  }

  public verificarEmailExistente(email: string): Observable<boolean> {
    return this.getEmail(email).pipe(
      map(response => {
        const apiResponse = response as { exists: boolean };
        return apiResponse.exists;
      })
    );
  }

  public verificarUsernameExistente(userName: string): Observable<boolean> {
    return this.getUserName(userName).pipe(
      map(response => {
        const apiResponse = response as { exists: boolean };
        return apiResponse.exists;
      })
    );
  }

  public cadastrarUsuario(user: User): Observable<any>{
    const headers = this.getHeaders();
    return this.http.post(`${URL_API}/user/store`,user,{headers});
  }
  
  public editarUsuario(user: User): Observable<any>{
    const idUsuario = user.id;
    const headers = this.getHeaders();
    return this.http.patch(`${URL_API}/user/update/${idUsuario}`,user,{headers});
  }

  public alterarSenha(user: UserSenha): Observable<any>{
    const headers = this.getHeaders();
    return this.http.patch(`${URL_API}/user/password`, user, { headers });
  }

  public resetSenha(user: User): Observable<any>{
    const headers = this.getHeaders();
    return this.http.patch(`${URL_API}/user/resetpassword`, user, { headers });
  }

  public deletarUsuario(id: number): Observable<any>{
    const headers = this.getHeaders();
    return this.http.delete(`${URL_API}/user/destroy/${id}`,{headers});
  }

  public logarUsuario(user: User): Observable<any>{
    return this.http.post(`${URL_API}/login`,user);
  }

  public autenticado(): boolean {
    if (this.token_id === null && localStorage.getItem('idToken') !== null) {
      this.token_id = localStorage.getItem('idToken');
    }

    if (this.token_id === null) {
      this.router.navigate(['/login']);
    }

    const nivelPermissao = localStorage.getItem('nivelPermissao');

    // Verifica se o nível de permissão existe e não é vazio
    if (nivelPermissao === null || nivelPermissao === '') {
      this.router.navigate(['/login']);
      return false;
    }

    //return this.token_id !== null;
    return true;
  }

  public logout(): void{
    const headers = this.getHeaders();
    this.http.post(`${URL_API}/logout`, null, { headers }).subscribe({
      next: () => {
        localStorage.removeItem('idToken');
        localStorage.removeItem('usuarioLogado');
        localStorage.removeItem('name');
        localStorage.removeItem('nivelPermissao');
        this.token_id = null;
        this.router.navigate(['/home']);        
      },
      error: (error) => {
        this.errorService.erro(error);
      }
    });
  }
}

