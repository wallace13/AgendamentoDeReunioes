<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Horario;
use Illuminate\Support\Facades\DB;

class HorarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Horario::all();
    }

    public function getHorariosDisponiveis()
    {
        return DB::table('horarios')->select('horarios.*')->where('ativo',1)->get();
    }

    public function getHorarioEspecifico(string $hora)
    {
        $horario = Horario::select('horario')->where('horario', $hora)->first();
        return (isset($horario)) ? ['exists' => true] : ['exists' => false];
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
            $horario = Horario::create($request->all());
            return ['success' => true];
        }catch(\Exception $error){
            return ['error' => $error];
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return DB::table('horarios')->select('horarios.*')->where('id',$id)->get();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try{
            $horario = Horario::find($id);

            $horario->ativo = $request->ativo;
            $horario->update(['ativo']);

            return ['sucess'=> true];
        }catch(\Exception $error){
            return ['error' => $error];
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $horario = Horario::find($id);
            $horario->delete();
            return ['sucess' => true];
        } catch (\Exception $error) {
            return ['error' => $error];
        }
    }
}
