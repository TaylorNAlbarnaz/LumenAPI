<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Filme;

class FilmeController extends Controller
{
    public function index()
    {
        $filmes = Filme::all();
        return response()->json($filmes);
    }

    public function store(Request $request)
    {
        // Validação
        $this->validate($request, [
            'nome' => 'required',
            'url_capa' => 'required',
            'ano_lancamento' => 'required',
            'genero' => 'required'
        ]);

        $filme = new Filme();
        $filme->nome = $request->input('nome');
        $filme->url_capa = $request->input('url_capa');
        $filme->ano_lancamento = $request->input('ano_lancamento');
        $filme->genero = $request->input('genero');

        $filme->save();

        return response()->json("Filme adicionado com sucesso!");
    }

    public function show($id)
    {
        $filme = Filme::find($id);
        return response()->json($filme);
    }

    public function update(Request $request, $id)
    {
        // Validação
        $this->validate($request, [
            'nome' => 'required',
            'url_capa' => 'required',
            'ano_lancamento' => 'required',
            'genero' => 'required'
        ]);
        
        $filme = Filme::find($id);

        $filme->nome = $request->input('nome');
        $filme->url_capa = $request->input('url_capa');
        $filme->ano_lancamento = $request->input('ano_lancamento');
        $filme->genero = $request->input('genero');

        $filme->save();

        return response()->json("Filme atualizado com sucesso!");
    }

    public function destroy($id)
    {
        $filme = Filme::find($id);
        $filme->delete();

        return response()->json("Filme removido com sucesso!");
    }

    public function showGenre($genero)
    {
        $filmes = Filme::where('genero', $genero)->get();

        return response()->json($filmes);
    }
}
