const generos = document.querySelectorAll("#menu_items > li");
const filmeContainer = document.getElementById("filmes");
let generoAtual = "all";

let filmesAtuais = [];

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

        filmeContainer.appendChild(container);
    }
}

generos.forEach((el) => el.addEventListener('click', () => selecionarGenero(el)));