<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('agendamentos', function(Blueprint $table) {
            $table->unsignedBigInteger('horario_id')->nullable()->after('id');
            $table->foreign('horario_id')->references('id')->on('horarios');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('agendamentos', function(Blueprint $table) {
            $table->dropForeign('agendamentos_horario_id_foreign');
            $table->dropColumn('horario_id');
        });
    }
};
