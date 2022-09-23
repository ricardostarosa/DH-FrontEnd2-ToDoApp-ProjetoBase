class Tarefas {
  constructor() {
    this.listaTarefas = [];
  }

  get tarefas() {
    return this.listaTarefas;
  }

  insereTarefas(lista) {
    this.listaTarefas = lista;
  }
}

export default Tarefas;
