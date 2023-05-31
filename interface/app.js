const generos = document.querySelectorAll("#menu_items > li");

pegarFilmes();

function selecionarGenero(el) {
    for (genero of generos) {
        genero.classList.remove("selected");
    }

    el.classList.add("selected");
}

function pegarFilmes() {

}

generos.forEach((el) => el.addEventListener('click', () => selecionarGenero(el)));