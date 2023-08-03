import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

import { Horario } from '../models/horario.model';
import { URL_API } from '../app.api';

@Injectable()
export class HorarioService{

  constructor(private http: HttpClient ) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('idToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  public getHorarios(): Observable<Horario[]> {
    const headers = this.getHeaders();
    return this.http.get<Horario[]>(`${URL_API}/horarios`,{headers}).pipe(
      map((resposta: Horario[]) => resposta)
    );
  }

  public getHorariosDisponiveis(): Observable<Horario[]> {
    const headers = this.getHeaders();
    return this.http.get<Horario[]>(`${URL_API}/horariosDisponiveis`,{headers}).pipe(
      map((resposta: Horario[]) => resposta)
    );
  }

  public cadastrarHorario(horario: Horario): Observable<any>{
    console.log(horario);
    const headers = this.getHeaders();
    return this.http.post(`${URL_API}/horario/store`,horario,{headers});
  }


  public getHorario(idHorario: number): Observable<any>{
    const headers = this.getHeaders();
    return this.http.get(`${URL_API}/horario/${idHorario}`,{headers});
  }

  public editarHora(horario: Horario): Observable<any>{
    console.log(horario)
    const idHora = horario.id;
    const headers = this.getHeaders();
    return this.http.patch(`${URL_API}/horario/update/${idHora}`,horario,{headers});
  }

  public deletarHorario(id: number): Observable<any>{
    const headers = this.getHeaders();
    return this.http.delete(`${URL_API}/horario/destroy/${id}`,{headers});
  }

  public getHorarioEspecifico(hora: string): Observable<any>{
    const headers = this.getHeaders();
    return this.http.get(`${URL_API}/horarioEspecifico/${hora}`,{headers});
  }

  public verificarHorarioExistente(horario: string): Observable<boolean> {
    return this.getHorarioEspecifico(horario).pipe(
      map(response => {
        const apiResponse = response as { exists: boolean };
        return apiResponse.exists;
      })
    );
  }
}

