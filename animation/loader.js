function loader(elemento) {
  elemento.innerHTML = `<div class="loader"></div>`;
}

function unLoader(elemento) {
  elemento.innerHTML = "Acessar";
}

export { loader, unLoader };
