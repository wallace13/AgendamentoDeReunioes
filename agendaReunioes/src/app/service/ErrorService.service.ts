import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(private router: Router) {}

  public erro(error: any): void {
    if (error.status === 422) {
        this.router.navigate(['/error', { errorCode: 422 }]);
    } else if (error.status === 500) {
        this.router.navigate(['/error', { errorCode: 500 }]);
    } else {
        this.router.navigate(['/error', { errorCode: 'unknown' }]);
    }
  }
}
