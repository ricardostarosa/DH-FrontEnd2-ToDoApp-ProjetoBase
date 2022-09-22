import Repository from "../Repo/Repository.js";

class Tarefas {
  constructor() {
    this.listaTarefas = [];
  }

  get tarefas() {
    return this.listaTarefas;
  }

  insereTarefas(lista) {
    this.listaTarefas = lista;
    // const listaTarefas = JSON.parse(localStorage.getItem("lista-tarefas"));

    // if (listaTarefas) {
    //   this.listaTarefas = listaTarefas;
    //   this.atualizaLocalStorage("lista-tarefas", lista);
    // } else {
    //   this.atualizaLocalStorage("lista-tarefas", lista);
    // }
  }
  atualizaLocalStorage(id, lista) {
    localStorage.setItem(id, JSON.stringify(lista));
  }
}

// codigo dataset

// document.querySelector(".tarefas-pendentes").children[0].addEventListener("click" , e => console.log(e.target.parentElement.dataset.id))

export default Tarefas;
