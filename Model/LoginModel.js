class Login {
  #email;
  #senha;

  insereEmail(email) {
    this.#email = email;
  }

  insereSenha(senha) {
    this.#senha = senha;
  }

  get email() {
    return this.#email;
  }

  get senha() {
    return this.#senha;
  }
}

export default Login;
