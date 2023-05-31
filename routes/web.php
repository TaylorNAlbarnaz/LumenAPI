<?php

$router->get('/filmes', 'FilmeController@index');
$router->post('/filmes', 'FilmeController@store');

$router->get('/filmes/{id}', 'FilmeController@show');
$router->put('/filmes/{id}', 'FilmeController@update');
$router->delete('/filmes/{id}', 'FilmeController@destroy');

$router->get('/filmes/genero/{genero}', 'FilmeController@showGenre');

$router->get('/', function () use ($router) {
    return $router->app->version();
});