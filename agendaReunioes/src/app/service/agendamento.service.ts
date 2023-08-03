import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders   } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Agendamento } from "../models/agendamento.model";
import { URL_API } from '../app.api';


@Injectable()
export class AgendamentoService{

  constructor(private http: HttpClient ) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('idToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  public getAgendamentos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${URL_API}/agendamentos`).pipe(
      map((resposta: Agendamento[]) => resposta)
    );
  }

  public getAgendamentosDoUsuario(): Observable<Agendamento[]> {
    const idUser = localStorage.getItem('usuarioLogado');
    const headers = this.getHeaders();
    return this.http.get<Agendamento[]>(`${URL_API}/agendamentos/${idUser}/user`,{headers}).pipe(
      map((resposta: Agendamento[]) => resposta)
    );
  }

  public getHorarios(): Observable<Agendamento[]> {
    const headers = this.getHeaders();
    return this.http.get<Agendamento[]>(`${URL_API}/horario`,{headers}).pipe(
      map((resposta: Agendamento[]) => resposta)
    );
  }

  public getReuniaoAgendada(idAgendamento: number): Observable<any>{
    const headers = this.getHeaders();
    return this.http.get(`${URL_API}/agendamentos/${idAgendamento}`,{headers});
  }

  public cadastrarReuniao(agendamento: Agendamento): Observable<any>{
    const headers = this.getHeaders();
    return this.http.post(`${URL_API}/agendamentos/store`,agendamento,{headers});
  }

  public editarReuniao(agendamento: Agendamento): Observable<any>{
    const idAgendamento = agendamento.id;
    const headers = this.getHeaders();
    return this.http.put(`${URL_API}/agendamentos/update/${idAgendamento}`,agendamento,{headers});
  }

  public deletarReuniao(id: number): Observable<any>{
    const headers = this.getHeaders();
    return this.http.delete(`${URL_API}/agendamentos/destroy/${id}`,{headers});
  }
}

