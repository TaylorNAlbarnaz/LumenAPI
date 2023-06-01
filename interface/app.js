const generos = document.querySelectorAll("#menu_items > li");
const filmeContainer = document.getElementById("filmes");
const modal = document.getElementById("modal");
const modalBackground = document.getElementById("modal-background");
const btnNovo = document.getElementById("btn_novo");
const btnSalvar = document.getElementById("btn_salvar");
const btnExcluir = document.getElementById("btn_excluir");
const btnCancelar = document.getElementById("btn_cancelar");
const inputErro = document.getElementById("input_erro");

const inputNome = document.getElementById("filme_nome");
const inputLancamento = document.getElementById("filme_lancamento");
const inputCapa = document.getElementById("filme_capa");
const inputGenero = document.getElementById("filme_genero");

let generoAtual = "all";
let filmesAtuais = [];
let editando = false;
let filmeEditado = null;
let erro = "";

pegarFilmes();

function selecionarGenero(el) {
    for (genero of generos) {
        genero.classList.remove("selected");
    }

    generoAtual = el.id;
    el.classList.add("selected");

    pegarFilmes();
}

async function pegarFilmes() {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    if (generoAtual == "all") {
        await fetch('http://[::1]:3000/filmes', {headers: headers})
                .then(res => res.json())
                .then(json => filmesAtuais = json)
    } else {
        await fetch('http://[::1]:3000/filmes/genero/' + generoAtual, {headers: headers})
                .then(res => res.json())
                .then(json => filmesAtuais = json)
    }

    atualizarGrid();
}

function atualizarGrid() {
    filmeContainer.innerHTML = "";

    for (filme of filmesAtuais) {
        const container = document.createElement("div");
        container.classList.add("filme");

        const capa = document.createElement("div");
        capa.classList.add("capa");
        capa.style.background = `url(${filme.url_capa})`;

        const titulo = document.createElement("div");
        titulo.classList.add("titulo");
        titulo.innerText = `${filme.nome} (${filme.ano_lancamento})`;

        container.appendChild(capa);
        container.appendChild(titulo);

        const filmeRef = filme;
        container.addEventListener('click', () => abrirTelaModificarFilme(filmeRef));
        filmeContainer.appendChild(container);
    }
}

function abrirTelaModificarFilme(filme) {
    editando = true;
    filmeEditado = filme;

    inputNome.value = filme.nome;
    inputLancamento.value = filme.ano_lancamento;
    inputCapa.value = filme.url_capa;
    
    for (var i = 0; i < inputGenero.options.length; i++) {
        if (inputGenero.options[i].value === filme.genero) {
            inputGenero.selectedIndex = i;
            break;
        }
    }

    abrirModal();
}

function abrirTelaCriarFilme() {
    editando = false;
    filmeEditado = null;

    inputNome.value = "";
    inputLancamento.value = 2023;
    inputCapa.value = "";
    inputGenero.selectedIndex = 0;

    abrirModal();
}

function abrirModal() {
    modal.classList.remove("hidden");
    modalBackground.classList.remove("hidden");

    if (editando) {
        btnExcluir.classList.remove("hidden");
    } else {
        btnExcluir.classList.add("hidden");
    }

    inputErro.innerText = erro;
}

function fecharModal() {
    modal.classList.add("hidden");
    modalBackground.classList.add("hidden");

    filmeEditado = null;
}

async function salvarFilme() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-type', 'application/json');

    let data = {};
    data.id = (filmeEditado == null ? 0 : filmeEditado.id);
    data.nome = inputNome.value;
    data.ano_lancamento = inputLancamento.value;
    data.url_capa = inputCapa.value;
    data.genero = inputGenero.value;

    if (editando) {
        await fetch('http://[::1]:3000/filmes/' + filmeEditado.id, {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify(data)
                });
    } else {
        await fetch('http://[::1]:3000/filmes', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(data)
                });
    }
        
    fecharModal();
    pegarFilmes();
}

async function excluirFilme() {
    if (filmeEditado == null)
        return;
    
    let headers = new Headers();

    await fetch('http://[::1]:3000/filmes/' + filmeEditado.id, {
                method: 'DELETE',
                headers: headers
            });

    fecharModal();
    pegarFilmes();
}

generos.forEach((el) => el.addEventListener('click', () => selecionarGenero(el)));
btnNovo.addEventListener('click', () => abrirTelaCriarFilme());
btnSalvar.addEventListener('click', () => salvarFilme());
btnExcluir.addEventListener('click', () => excluirFilme());
btnCancelar.addEventListener('click', () => fecharModal());