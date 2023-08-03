import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { HorarioService } from "./horario.service";
import { Observable } from "rxjs";

@Injectable()
export class HorarioEditarResolver implements Resolve<any[]> {
    constructor(private horarioServe: HorarioService){}

    resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
        const idHorario = route.params['id'];
        return this.horarioServe.getHorario(idHorario);
    }
    
}