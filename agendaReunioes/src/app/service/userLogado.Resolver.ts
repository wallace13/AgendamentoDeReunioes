import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { UserService } from "./user.service";
import { Observable } from "rxjs";

@Injectable()
export class UserLogadoResolver implements Resolve<any[]> {
    constructor(private userServe: UserService){}
    resolve(): Observable<any[]> {
        return this.userServe.getUserLogado();
    }
    
}