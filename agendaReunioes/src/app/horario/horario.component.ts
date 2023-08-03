import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { Horario } from '../models/horario.model';
import { HorarioService } from '../service/horario.service';
import { ErrorService } from '../service/ErrorService.service';

declare var $: any; // Declaração para utilizar o jQuery

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css'],
  providers: [HorarioService]
})
export class HorarioComponent implements OnInit{
  public horarios!: Horario[];
  public horario!: Horario;
  public isModalOpen: boolean = false;
  idHorario!: number;

  title = 'pagination';
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5,30,100];
  public sortedData!: Horario[];


  constructor(
    private horarioService: HorarioService,
    private router: Router,
    private errorService: ErrorService
  ) {  }

  ngOnInit() {
    this.carregaHorarios();
  }

  public carregaHorarios(): void {
    this.horarioService.getHorarios()
      .subscribe((horarios: Horario[]) => {
        this.horarios = horarios;
        this.sortedData = horarios.slice();
      },(error: any) => {
        this.errorService.erro(error);
      });
  }

  onTableDataChange(event: any): void{
    this.page = event;
    this.carregaHorarios();
  }
  onTableSizeChange(event: any): void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.carregaHorarios();
  }

  openModal(id: any) {
    this.idHorario = id;
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
    this.horarioService.deletarHorario(id).subscribe({
      next: () => {
        this.closeModal();
        this.carregaHorarios();
      },
      error: (error) => {
        this.errorService.erro(error);
      }
    });
  }

  public editar(idHorario: any) {
    this.horarioService.getHorario(idHorario)
      .subscribe((horario: Horario) => {
        this.horario = horario;
      },(error: any) => {
        this.errorService.erro(error);
      });

    this.router.navigate(['/horario/edit/', idHorario]);
  }
  sortData(sort: Sort) {
    const data = this.horarios.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id!, b.id!, isAsc);
        case 'horarioInicial':
          return compare(a.horarioInicial.toString(), b.horarioInicial.toString(), isAsc);
        case 'horarioFinal':
          return compare(a.horarioFinal.toString(), b.horarioFinal.toString(), isAsc);
        case 'ativo':
          return compare(a.ativo.toString(), b.ativo.toString(), isAsc);
        default:
          return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

