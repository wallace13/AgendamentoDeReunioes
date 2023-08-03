import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { AgendamentoService } from "./agendamento.service";
import { Observable } from "rxjs";

@Injectable()
export class AgendamentoResolver implements Resolve<any[]> {
    constructor(private agendamentoServe: AgendamentoService){}
    resolve(): Observable<any[]> {
        return this.agendamentoServe.getAgendamentos();
    }
    
}