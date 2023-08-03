<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agendamento extends Model
{
    use HasFactory;

    protected $fillable = ['assunto', 'responsavel', 'setor', 'ramal', 'data', 'videoConferencia', 'assistencia', 'observacao','horario_id','user_id'];

    public function user() {
        //belongsTo (pertence a)
        return $this->belongsTo('App\Models\User');
    }
    public function horario() {
        //belongsTo (pertence a)
        return $this->belongsTo('App\Models\Horario');
    }
}
