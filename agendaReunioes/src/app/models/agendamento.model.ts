import { Horario } from "./horario.model";

class Agendamento{
  date: any;
  constructor(
      public assunto: string,
      public responsavel: string,
      public setor: string,
      public ramal: string,
      public data: string | Date,
      public videoConferencia: boolean,
      public assistencia: boolean,
      public observacao: string,
      public horario_id : number,
      public user_id?: number,
      public id?: number,
      public name?: string,
      public horarioInicial?: string,
      public horarioFinal?: string,
  ){}

}
export {Agendamento}
