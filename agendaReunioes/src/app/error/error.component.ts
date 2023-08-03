import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  public errorCode!: any;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
      this.route.paramMap.subscribe(params => {
      localStorage.removeItem('idToken');
      localStorage.removeItem('usuarioLogado');
      localStorage.removeItem('name');
      localStorage.removeItem('nivelPermissao');
      this.errorCode = params.get('errorCode')?.toString();
    });
  }  
}