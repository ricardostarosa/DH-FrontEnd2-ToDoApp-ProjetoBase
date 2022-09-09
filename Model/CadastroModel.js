class Cadastro {
  #listaCadastro;

  constructor() {
    this.#listaCadastro = {};
  }

  insereNome(nome) {
    this.#listaCadastro["nome"] = nome;
  }

  insereSobrenome(sobrenome) {
    this.#listaCadastro["sobrenome"] = sobrenome;
  }

  insereEmail(email) {
    this.#listaCadastro["email"] = email;
  }

  insereSenha(senha) {
    this.#listaCadastro["senha"] = senha;
  }

  insereRepetirSenha(repetirSenha) {
    this.#listaCadastro["repetirSenha"] = repetirSenha;
  }

  get lista() {
    return this.#listaCadastro;
  }
}

export default Cadastro;
