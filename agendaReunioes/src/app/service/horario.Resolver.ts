import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { HorarioService } from "./horario.service";
import { Observable } from "rxjs";

@Injectable()
export class HorarioResolver implements Resolve<any[]> {
    constructor(private horarioServe: HorarioService){}
    resolve(): Observable<any[]> {
        return this.horarioServe.getHorarios();
    }
    
}