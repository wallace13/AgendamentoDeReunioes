import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl} from '@angular/forms';
import { Validators } from '@angular/forms';

import { Agendamento } from "../../models/agendamento.model"
import { Horario } from 'src/app/models/horario.model';
import { AgendamentoService } from '../../service/agendamento.service'
import { HorarioService } from 'src/app/service/horario.service';
import { ErrorService } from 'src/app/service/ErrorService.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  isFormSubmitted = false;

  public userId = localStorage.getItem('usuarioLogado')
  public agendamento!: Agendamento[]

  public idAgendamento: any;
  public tipo: any;
  public rota:any;
  public data: any;
  public setores = ['Setor 01','Setor 02','Setor 03', 'Setor 04','Setor 05','Setor 06'];
  public horarios: any[] = [];

  public carregaHorarios(): void {
    this.horarioService.getHorariosDisponiveis()
      .subscribe((horarios: Horario[]) => {
        this.horarios = horarios;
        this.getHorariosData();
      },(error: any) => {
        this.errorService.erro(error);
      });
  }
  public horariosDisponiveis: any[] = [];
  public dataInserida: any;
  public info: string = "";

  public formulario: FormGroup = new FormGroup({
    'assunto': new FormControl(null, [Validators.required]),
    'responsavel': new FormControl(null, [Validators.required]),
    'setor': new FormControl(null, [Validators.required]),
    'ramal': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')]),
    'data': new FormControl(null, [Validators.required]),
    'videoConferencia': new FormControl(null, [Validators.required]),
    'assistencia': new FormControl(null, [Validators.required]),
    'observacao': new FormControl(null),
    'horario_id': new FormControl(null, [Validators.required]),
    'user_id': new FormControl(this.userId)
  });

  constructor(
    private agendamentoService: AgendamentoService,
    private horarioService: HorarioService,
    private router: Router,
    private route: ActivatedRoute,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.carregaHorarios();

    this.route.paramMap.subscribe(params => {
      this.idAgendamento = params.get('id');
      this.tipo = params.get('tipo');
      if (this.tipo === "admin") {
        this.rota = '/reunioes';
      } else {
        this.rota = '/reuniao';
      }    
    });
    if (this.idAgendamento !== null) {
      this.agendamentoService.getReuniaoAgendada(this.idAgendamento)
        .subscribe((agendamento: Agendamento[]) => {
          this.agendamento = agendamento;
          this.formulario.patchValue({
            assunto: this.agendamento[0]['assunto'],
            responsavel: this.agendamento[0]['responsavel'],
            setor: this.agendamento[0]['setor'],
            ramal: this.agendamento[0]['ramal'],
            data: this.agendamento[0]['data'],
            videoConferencia: this.agendamento[0]['videoConferencia'].toString(),
            assistencia: this.agendamento[0]['assistencia'].toString(),
            observacao: this.agendamento[0]['observacao'],
            horario_id: this.agendamento[0]['horario_id'],
            user_id: this.agendamento[0]['user_id'],
          });
          this.getHorariosData();
        },(error: any) => {
          this.errorService.erro(error)
        });
    }
  }
  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  public getHorariosData(): void {
    const dataSelecionada = this.formulario.value.data;
    this.dataInserida = dataSelecionada ? dataSelecionada : null;
    if(dataSelecionada !== null){
      this.agendamentoService.getHorarios().subscribe((agendamentos: Agendamento[]) => {
        //Filtra os agendamentos pela data selecionada
        const horariosAgendados = agendamentos.filter(agendamento => agendamento.data === dataSelecionada);
        //Filtra os horários disponíveis
        this.horariosDisponiveis = this.horarios.filter(horario => {
            this.info = "Sem Disponibilidade";
            const isHorarioAgendado = horariosAgendados.some(agendamento => agendamento.horarioInicial === horario.horarioInicial && agendamento.horarioFinal === horario.horarioFinal);
            return !isHorarioAgendado;
        });
        //filtra se horario é o mesmo do id da edição
        if(this.idAgendamento !== null){
          this.horarios.filter(horario => {
            if(horario.id === this.agendamento[0]['horario_id'] && dataSelecionada === this.agendamento[0]['data']){
              this.horariosDisponiveis.push(horario);
            }
          });
        }
      });
    }
  }
  public isHorarioDisponivel(horario: string): boolean {
    return this.horariosDisponiveis.includes(horario);
  }

  public salvaReuniao(): void {
    this.isFormSubmitted = true;
    if (this.formulario.valid) {
      const reuniao: Agendamento = new Agendamento(
        this.formulario.value.assunto,
        this.formulario.value.responsavel,
        this.formulario.value.setor,
        this.formulario.value.ramal,
        this.formulario.value.data,
        this.formulario.value.videoConferencia,
        this.formulario.value.assistencia,
        this.formulario.value.observacao,
        this.formulario.value.horario_id,
        this.formulario.value.user_id
      );
      if (reuniao.observacao === "" || reuniao.observacao === null) {
        reuniao.observacao = "Nenhuma";
      }
      if (this.idAgendamento === null) {
        this.agendamentoService.cadastrarReuniao(reuniao).subscribe({
          next: () => {
            this.router.navigate([this.rota]);
          },
          error: (error) => {
            this.errorService.erro(error);
          }
        });
      } else {
        reuniao.id = this.idAgendamento;
        if (this.formulario.valid) {
          this.agendamentoService.editarReuniao(reuniao).subscribe({
            next: () => {              
              this.router.navigate([this.rota]);
            },
            error: (error) => {
              this.errorService.erro(error)
            }
          });
        }
      }
    }
  }
}



