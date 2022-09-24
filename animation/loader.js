function loader(elemento) {
  elemento.innerHTML = `<div class="loader"></div>`;
}

function loaderUsuario(elemento) {
  elemento.innerHTML = `<div class="loader-usuario"></div>`;
}

function unLoader(elemento) {
  elemento.innerHTML = "Acessar";
}

export { loader, unLoader, loaderUsuario };
