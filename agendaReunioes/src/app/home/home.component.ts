import { Component, OnInit } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Agendamento } from "../models/agendamento.model";
import { User } from '../models/user.model';
import { UserService } from '../service/user.service';
import { AgendamentoService } from '../service/agendamento.service';
import { UserDataService } from '../service/userDataService';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { ErrorService } from '../service/ErrorService.service';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import interactionPlugin from '@fullcalendar/interaction';
import {Clipboard} from '@angular/cdk/clipboard';

declare var $: any; // Declaração para utilizar o jQuery

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AgendamentoService],
})
export class HomeComponent implements OnInit {
  //email do escrevente
  value = "emailDoEncarregado@teste.com.br";
  
  title = 'pagination';
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5,30,100];

  public isModalOpen: boolean = false;
  public agendamentos!: Agendamento[]
  public usuarioLogado!: any;
  public logado: any = localStorage.getItem('usuarioLogado');
  
  evento: any;

  constructor(
    private agendamentoService: AgendamentoService,
    private datePipe: DatePipe,
    private userService: UserService,
    private userDataService: UserDataService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('usuarioLogado')){
      this.userService.getUserLogado().subscribe(
        (usuario: User) => {
          this.usuarioLogado = usuario;
          //Compartilha o Usuário com outros componentes
          this.userDataService.setUsuarioLogado(usuario);
        },
      )
    }    
    this.agendamentoList();
  }

  agendamentoList():void{
    this.agendamentoService.getAgendamentos()
    .subscribe((agendamentos: Agendamento[]) => {
      this.agendamentos = agendamentos;
      const eventos: any[] = [];
      agendamentos.forEach((element: Agendamento) => {
        let cor = "";
        if (element.horarioInicial === "08:00:00") {
          cor = "#198754";
        } else {
          cor = "#ffc107";
        }
        eventos.push({
          title: element.assunto,
          start: element.data+'T'+element.horarioInicial,
          end: element.data+'T'+element.horarioFinal,
          evento: element,
          responsavel: element.responsavel,
          backgroundColor: cor,
          borderColor: cor,
          display: 'block', // Define como o evento é exibido
        });
      });
      this.calendarOptions.events = eventos;
    },(error: any) => {
      this.errorService.erro(error);
    });
  }
  formatarData(data: any): any {
    return this.datePipe.transform(data, 'dd/MM/yyyy') || '';
  }
  formatarDataExtenso(data: any): any {
    const date = new Date(data);
    const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()); // Converter para UTC
    const formattedDate = format(utcDate, "d 'de' MMMM 'de' yyyy", { locale: pt });
    return formattedDate || '';
  }
  formatarHorario(horario: any): any {
    if (horario) {
      const date = new Date();
      const [hours, minutes] = horario.split(':');
      date.setHours(Number(hours));
      date.setMinutes(Number(minutes));

      const formattedHorario = format(date, 'HH:mm');
      return formattedHorario || '';
    }

    return '';
  }
  formatarHora(data: Date): string {
    return formatDate(data, 'HH:mm', 'en-US');
  }
  onTableDataChange(event: any): void{
    this.page = event;
    this.agendamentoList();
  }
  onTableSizeChange(event: any): void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.agendamentoList();
  }

  calendarOptions: CalendarOptions = {
    themeSystem: 'bootstrap5',
    locale: 'pt-br',
    plugins: [interactionPlugin, bootstrap5Plugin, dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    weekends: false, //Define se terá sabado e domingo
    events: [],
    displayEventTime:true,
    displayEventEnd:true,//se deve exibir o horario final
    buttonText: {
      today: 'Hoje',
      month: 'Mês',
      week: 'Semana',
      day: 'Hoje',
      list: 'Lista',
    },
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listMonth,timeGridWeek,timeGridDay'
    },
    titleFormat: {
      month: 'long',
      year: 'numeric'
    },
    dayHeaderFormat: {
      weekday: 'long'
    },
    droppable: true,
    navLinks: true, // can click day/week names to navigate views
    editable: false, //Permite mover o evento
    dayMaxEvents: false, // allow "more" link when too many events
    allDaySlot: false, //se exibira o AllDay "O dia todo"
    slotMinTime: '07:00',//Horario de Inicio
    slotMaxTime: '19:00',//Horario de fim
    nowIndicator: true,//Indicador de Horario
    businessHours: [
      {
        daysOfWeek: [1, 2, 3, 4, 5], // Segunda a sábado
        startTime: '08:00', // Início do primeiro horário comercial
        endTime: '12:00' // Fim do primeiro horário comercial
      },
      {
        daysOfWeek: [1, 2, 3, 4, 5], // Segunda a sexta
        startTime: '13:00', // Início do segundo horário comercial
        endTime: '16:00' // Fim do segundo horário comercial
      }
    ],

  };
  openModal(evento: any) {
    this.evento = evento;
    this.isModalOpen = true;
    $(".modal-backdrop").show();
    $(".modal").show();
  }
  closeModal() {
    this.isModalOpen = false;
    $(".modal-backdrop").hide();
    $(".modal").hide();
  }
}