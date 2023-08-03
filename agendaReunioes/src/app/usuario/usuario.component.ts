import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';

import { User } from '../models/user.model';
import { UserService } from '../service/user.service';
import { ErrorService } from '../service/ErrorService.service';

declare var $: any; // Declaração para utilizar o jQuery

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [UserService]
})
export class UsuarioComponent implements OnInit{

  title = 'pagination';
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5,30,100];

  public isModalOpen: boolean = false;
  idUser!: number;
  public usuario!: User;

  public users!: User[];
  public sortedData!: User[];
  public situacao!: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private errorService: ErrorService
  ){}

  ngOnInit(): void {
    this.userList();
  }

  userList():void{
    this.userService.getUsuarios()
    .subscribe((user: User[]) => {
      this.users = user;
      this.sortedData = user.slice();
    },(error: any) => {
      this.errorService.erro(error);
    });
  }

  onTableDataChange(event: any): void{
    this.page = event;
    this.userList();
  }

  onTableSizeChange(event: any): void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.userList();
  }
  openModal(user: any, tipo: string) {
    this.usuario = user;
    this.situacao = tipo;
    this.isModalOpen = true;
    $(".modal-backdrop").show();
    $(".modal").show();
  }
  closeModal() {
    this.isModalOpen = false;
    $(".modal-backdrop").hide();
    $(".modal").hide();
  }
  public deletar(id: any) {
    this.userService.deletarUsuario(id).subscribe({
      next: () => {
        this.closeModal();
        this.userList();
      },
      error: (error: any) => {
        this.errorService.erro(error);
      }
    });
  }
  public resetSenha(usuario: any){
    this.userService.resetSenha(usuario).subscribe({
      next: () => {
        this.closeModal();
      },
      error: (error: any) => {
        this.errorService.erro(error);
      }
    });
  }

  public editar(idUser: any) {
    this.router.navigate(['/usuario/edit/', idUser]);
  }
  sortData(sort: Sort) {
    const data = this.users.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id!, b.id!, isAsc);
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'userName':
          return compare(a.userName, b.userName, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
        case 'ramal':
          return compare(a.ramal, b.ramal, isAsc);
        case 'nivelPermissao':
          return compare(a.nivelPermissao.toString(), b.nivelPermissao.toString(), isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


