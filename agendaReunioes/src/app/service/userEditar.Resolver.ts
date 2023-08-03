import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { UserService } from "./user.service";
import { Observable } from "rxjs";

@Injectable()
export class UserEditarResolver implements Resolve<any[]> {
    constructor(private userServe: UserService){}

    resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
        const idUser = route.params['id'];
        return this.userServe.getUsuario(idUser);
    }
    
}