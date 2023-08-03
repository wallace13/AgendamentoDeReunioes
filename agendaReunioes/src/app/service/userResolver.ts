import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { UserService } from "./user.service";
import { Observable } from "rxjs";

@Injectable()
export class UserResolver implements Resolve<any[]> {
    constructor(private userServe: UserService){}
    resolve(): Observable<any[]> {
        return this.userServe.getUsuarios();
    }
    
}