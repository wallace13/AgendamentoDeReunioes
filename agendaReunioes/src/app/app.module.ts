import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ClipboardModule} from '@angular/cdk/clipboard';

import { FullCalendarModule } from '@fullcalendar/angular';
import { AppRoutingModule } from './app-routing.module';

import { NgxPaginationModule } from 'ngx-pagination';

import { AgendamentoService } from './service/agendamento.service';
import { AutenticacaoGuard } from './service/autenticacao-guard.service';
import { NoAuthGuard } from './service/no-auth-guard.service';
import { UserService } from './service/user.service';
import { HorarioService } from './service/horario.service';
import { UserDataService } from './service/userDataService';
import { ErrorInterceptor } from './service/ErrorInterceptor.service';
import { ErrorService } from './service/ErrorService.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './usuario/register/register.component';
import { ReuniaoComponent } from './reuniao/reuniao.component';
import { CreateComponent } from './reuniao/create/create.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HorarioComponent } from './horario/horario.component';
import { CreateHorarioComponent } from './horario/create-horario/create-horario.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ErrorComponent } from './error/error.component';
import { ReunioesComponent } from './reunioes/reunioes.component';
import { AgendamentoResolver } from './service/agendamentoResolver';
import { AgendamentoEditarResolver } from './service/agendamentoEditar.Resolver';
import { AgendamentoUserResolver } from './service/agendamentoUser.Resolver';
import { HorarioResolver } from './service/horario.Resolver';
import { HorarioEditarResolver } from './service/horarioEditar.Resolver';
import { UserResolver } from './service/userResolver';
import { UserEditarResolver } from './service/userEditar.Resolver';
import { UserLogadoResolver } from './service/userLogado.Resolver';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ReuniaoComponent,
    CreateComponent,
    PerfilComponent,
    HorarioComponent,
    CreateHorarioComponent,
    UsuarioComponent,
    ErrorComponent,
    ReunioesComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    FullCalendarModule,
    MatSortModule,
    BrowserAnimationsModule,
    ClipboardModule
  ],
  providers: [
    AgendamentoService,
    NoAuthGuard,
    UserService,
    AutenticacaoGuard,
    HorarioService,
    DatePipe,
    UserDataService,
    ErrorService,
    AgendamentoResolver,
    AgendamentoEditarResolver,
    AgendamentoUserResolver,
    HorarioResolver,
    HorarioEditarResolver,
    UserResolver,
    UserEditarResolver,
    UserLogadoResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

