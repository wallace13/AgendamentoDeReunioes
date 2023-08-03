import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl} from '@angular/forms';
import { Validators, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { HorarioService } from 'src/app/service/horario.service';
import { Horario } from 'src/app/models/horario.model';
import { ErrorService } from 'src/app/service/ErrorService.service';

@Component({
  selector: 'app-create-horario',
  templateUrl: './create-horario.component.html',
  styleUrls: ['./create-horario.component.css']
})
export class CreateHorarioComponent implements OnInit{

  isFormSubmitted = false;
  public idHora: any;
  public horario!: Horario[]

  public formulario: FormGroup = new FormGroup({
    'horarioInicial': new FormControl(null, [Validators.required]),
    'horarioFinal': new FormControl(null, [Validators.required]),
    'ativo': new FormControl(1),
  });

  constructor(
    private horarioService: HorarioService,
    private router: Router,
    private route: ActivatedRoute,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idHora = params.get('id');
    });

    if (this.idHora !== null) {
      this.horarioService.getHorario(this.idHora)
        .subscribe((horario: Horario[]) => {
          this.horario = horario;
          this.initializeForm();
        },(error: any) => {
          this.errorService.erro(error)
        });
    }
  }

  private initializeForm(): void {
    this.formulario.patchValue({
      horarioInicial: this.horario[0]['horarioInicial'],
      horarioFinal: this.horario[0]['horarioFinal'],
      ativo: this.horario[0]['ativo'],
    });
  }

  public salvarHorario(): void {
    this.isFormSubmitted = true;
      if (this.formulario.valid) {

        const hora: Horario = new Horario(
          this.formulario.value.horarioInicial,
          this.formulario.value.horarioFinal,
          this.formulario.value.ativo
        );
        if (this.idHora === null) {
          this.horarioService.cadastrarHorario(hora).subscribe({
            next: () => {
              this.router.navigate(['/horario']);
            },
            error: (error) => {
              this.errorService.erro(error)
            }
          });
        }else{
          hora.id = this.idHora;
          if (this.formulario.valid) {
            this.horarioService.editarHora(hora).subscribe({
              next: () => {
                this.router.navigate(['/horario']);
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

