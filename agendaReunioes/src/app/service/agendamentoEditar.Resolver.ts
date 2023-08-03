import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { AgendamentoService } from "./agendamento.service";
import { Observable } from "rxjs";

@Injectable()
export class AgendamentoEditarResolver implements Resolve<any[]> {
    constructor(private agendamentoServe: AgendamentoService){}

    resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
        const idAgendamento = route.params['id'];
        return this.agendamentoServe.getReuniaoAgendada(idAgendamento)
    }
    
}