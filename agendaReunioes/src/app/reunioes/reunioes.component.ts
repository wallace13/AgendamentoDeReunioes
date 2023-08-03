import { Component, OnInit } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { Agendamento } from "../models/agendamento.model";
import { AgendamentoService } from '../service/agendamento.service';
import { ErrorService } from '../service/ErrorService.service';
import { Sort } from '@angular/material/sort';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
declare var $: any; // Declaração para utilizar o jQuery

@Component({
  selector: 'app-reunioes',
  templateUrl: './reunioes.component.html',
  styleUrls: ['./reunioes.component.css'],
  providers: [AgendamentoService]
})
export class ReunioesComponent implements OnInit {

  public agendamentos!: Agendamento[];
  public agendamento!: Agendamento;
  public isModalOpen: boolean = false;
  public situacao!: string;
  idAgendamento!: number;

  title = 'pagination';
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5,30,100];

  public sortedData!: Agendamento[];

  constructor(
    private agendamentoService: AgendamentoService,
    private router: Router,
    private datePipe: DatePipe,
    private errorService: ErrorService,
  ) {
  }

  ngOnInit() {
    this.carregaAgendamentos();
  }

  public carregaAgendamentos(): void {
    this.agendamentoService.getAgendamentos()
      .subscribe((agendamentos: Agendamento[]) => {
        this.agendamentos = agendamentos;        
        this.sortedData = agendamentos.slice();
      },(error: any) => {
        this.errorService.erro(error);
      });
  }

  onTableDataChange(event: any): void{
    this.page = event;
    this.carregaAgendamentos();
  }
  onTableSizeChange(event: any): void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.carregaAgendamentos();
  }
  formatarData(data: any): any {
    return this.datePipe.transform(data, 'dd/MM/yyyy') || '';
  }
  open(agendamento: any, tipo: string) {
    this.agendamento = agendamento;
    this.situacao = tipo;
    this.isModalOpen = true;
    $(".modal-backdrop").show();
    $(".modal").show();
  }

  closeModal() {
    this.situacao = "";
    this.isModalOpen = false;
    $(".modal-backdrop").hide();
    $(".modal").hide();
  }

  public deletar(id: any) {
    this.agendamentoService.deletarReuniao(id).subscribe({
      next: () => {
        this.closeModal();
        this.carregaAgendamentos();
      },
      error: (error) => {
        this.errorService.erro(error);
      }
    });
  }

  public editar(idAgendamento: any) {
    const tipo = "admin";
    this.router.navigate(['/reuniao/edit/', idAgendamento, tipo]);
  }

  formatarHora(data: Date): string {
    return formatDate(data, 'HH:mm', 'en-US');
  }
  formatarDataExtenso(data: any): any {
    const date = new Date(data);
    const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()); // Converter para UTC
    const formattedDate = format(utcDate, "d 'de' MMMM 'de' yyyy", { locale: pt });
    return formattedDate || '';
  }

  //Filtros
  sortData(sort: Sort) {
    const data = this.agendamentos.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id!, b.id!, isAsc);
        case 'assunto':
          return compare(a.assunto, b.assunto, isAsc);
        case 'responsavel':
          return compare(a.responsavel, b.responsavel, isAsc);
        case 'om':
          return compare(a.setor, b.setor, isAsc);
        case 'ramal':
          return compare(a.ramal, b.ramal, isAsc);
        case 'data':
          return compare(a.data.toString(), b.data.toString(), isAsc);
        case 'horarioInicial':
          return compare(a.horarioInicial!, b.horarioInicial!, isAsc);
        case 'name':
          return compare(a.name!, b.name!, isAsc);
        default:
          return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

