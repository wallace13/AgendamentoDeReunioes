import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

//Importação de ROTAS
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './usuario/register/register.component';
import { ReuniaoComponent } from './reuniao/reuniao.component';
import { CreateComponent } from './reuniao/create/create.component';
import { CreateHorarioComponent } from './horario/create-horario/create-horario.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HorarioComponent } from './horario/horario.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ErrorComponent } from './error/error.component';
import { ReunioesComponent } from './reunioes/reunioes.component';

import { AutenticacaoGuard } from './service/autenticacao-guard.service' // Importe o AutenticacaoGuard
import { NoAuthGuard } from './service/no-auth-guard.service';
import { AgendamentoResolver } from './service/agendamentoResolver';
import { AgendamentoEditarResolver } from './service/agendamentoEditar.Resolver';
import { AgendamentoUserResolver } from './service/agendamentoUser.Resolver';
import { HorarioResolver } from './service/horario.Resolver';
import { HorarioEditarResolver } from './service/horarioEditar.Resolver';
import { UserResolver } from './service/userResolver';
import { UserEditarResolver } from './service/userEditar.Resolver';
import { UserLogadoResolver } from './service/userLogado.Resolver';

const routes: Routes = [
  { path: 'error', component: ErrorComponent },
  { path: '', component: HomeComponent, resolve: { reuniao: AgendamentoResolver}},
  { path: 'home', component: HomeComponent, resolve: { reuniao: AgendamentoResolver}},
  { path: 'perfil', component: PerfilComponent, canActivate: [ AutenticacaoGuard ], data: { roles: [0, 1, 2] }, resolve: { usuario: UserLogadoResolver}},
  { path: 'login', component: LoginComponent, canActivate: [ NoAuthGuard ] },
  { path: 'usuario', component: UsuarioComponent, canActivate: [ AutenticacaoGuard ], data: { roles: [0] } , resolve: { usuario: UserResolver}},
  { path: 'usuario/register', component: RegisterComponent, canActivate: [ AutenticacaoGuard ], data: { roles: [0] } },
  { path: 'usuario/edit/:id', component: RegisterComponent, canActivate: [ AutenticacaoGuard ], data: { roles: [0] } , resolve: { usuario: UserEditarResolver}},
  { path: 'registro', component: RegisterComponent, canActivate: [ AutenticacaoGuard ], data: { roles: [0] } },
  { path: 'reuniao', component: ReuniaoComponent, canActivate: [ AutenticacaoGuard ], data: { roles: [0, 1, 2] }, resolve: { reuniao: AgendamentoUserResolver} },
  { path: 'reuniao/create', component: CreateComponent, canActivate: [ AutenticacaoGuard ], data: { roles: [0, 1, 2] } },
  { path: 'reuniao/create/:tipo', component: CreateComponent, canActivate: [ AutenticacaoGuard ], data: { roles: [0, 1, 2] } },
  { path: 'reuniao/edit/:id', component: CreateComponent, canActivate: [ AutenticacaoGuard ], data: { roles: [0, 1, 2] }, resolve: { reuniao: AgendamentoEditarResolver} },
  { path: 'reuniao/edit/:id/:tipo', component: CreateComponent, canActivate: [ AutenticacaoGuard ], data: { roles: [0, 1, 2]} , resolve: { reuniao: AgendamentoEditarResolver} },
  { path: 'horario', component: HorarioComponent, canActivate: [ AutenticacaoGuard ], data: { roles: [0, 1] }, resolve: { horario: HorarioResolver}},
  { path: 'horario/create', component: CreateHorarioComponent, canActivate: [ AutenticacaoGuard ], data: { roles: [0, 1] } },
  { path: 'horario/edit/:id', component: CreateHorarioComponent, canActivate: [ AutenticacaoGuard ], data: { roles: [0, 1] }, resolve: { horario: HorarioEditarResolver} },
  { path: 'reunioes', component: ReunioesComponent, canActivate: [ AutenticacaoGuard ], data: { roles: [0, 1] }, resolve: { reuniao: AgendamentoResolver} },
];

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
