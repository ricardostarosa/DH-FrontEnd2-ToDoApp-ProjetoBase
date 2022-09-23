class Tarefas {
  constructor() {
    this.listaTarefas = [];
  }

  get tarefas() {
    return this.listaTarefas;
  }

  insereTarefas(lista) {
    this.listaTarefas = lista;

    // this.verificaStorage();

    // if (listaTarefas) {
    //   this.listaTarefas = listaTarefas;
    //   this.atualizaLocalStorage("lista-tarefas", lista);
    // } else {
    //   this.atualizaLocalStorage("lista-tarefas", lista);
    // }
  }

  verificaStorage() {
    return JSON.parse(localStorage.getItem("lista-tarefas"));
  }
  atualizaLocalStorage(id, lista) {
    localStorage.setItem(id, JSON.stringify(lista));
  }
}

// codigo dataset

// document.querySelector(".tarefas-pendentes").children[0].addEventListener("click" , e => console.log(e.target.parentElement.dataset.id))

export default Tarefas;
