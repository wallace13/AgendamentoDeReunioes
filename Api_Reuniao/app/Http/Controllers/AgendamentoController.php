<?php

namespace App\Http\Controllers;

use App\Models\Agendamento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AgendamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $agendamento = DB::table('agendamentos')
            ->join('users', 'users.id', '=', 'agendamentos.user_id')
            ->join('horarios', 'horarios.id', '=', 'agendamentos.horario_id')
            ->select('agendamentos.*', 'users.name','horarios.horarioInicial','horarios.horarioFinal')
            ->get();

        return $agendamento;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $agendamento = Agendamento::create($request->all());
            return ['success' => true];
        }catch(\Exception $error){
            return ['error' => $error];
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $agendamento = DB::table('agendamentos')->select('agendamentos.*')->where('id',$id)->get();
        return $agendamento;
    }

    public function getUserAgendamento($id)
    {
        $agendamento = DB::table('agendamentos')
                    ->join('horarios', 'horarios.id', '=', 'agendamentos.horario_id')
                    ->select('agendamentos.*', 'horarios.horarioInicial','horarios.horarioFinal')
                    ->where('user_id',$id)
                    ->orderBy('agendamentos.data', 'desc')
                    ->get();

        return $agendamento;

    }

    public function getHorarios()
    {
        $agendamento = DB::table('agendamentos')
                    ->join('horarios', 'horarios.id', '=', 'agendamentos.horario_id')
                    ->select('agendamentos.id','agendamentos.data', 'agendamentos.horario_id' , 'horarios.*')
                    ->get();

        return $agendamento;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Agendamento $agendamento)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try{
            $agendamento = Agendamento::find($id);

            $agendamento->assunto = $request->assunto;
            $agendamento->responsavel = $request->responsavel;
            $agendamento->setor = $request->setor;
            $agendamento->ramal = $request->ramal;
            $agendamento->data = $request->data;
            $agendamento->videoConferencia = $request->videoConferencia;
            $agendamento->assistencia = $request->assistencia;
            $agendamento->observacao = $request->observacao;
            $agendamento->horario_id = $request->horario_id;
            $agendamento->update();

            return ['sucess'=> true];
        }catch(\Exception $error){
            return ['error' => $error];
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $agendamento = Agendamento::find($id);
            $agendamento->delete();
            return ['sucess' => true];
        } catch (\Exception $error) {
            return ['error' => $error];
        }
    }
}
