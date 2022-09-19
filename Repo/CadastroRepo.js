const RECURSOS = {
  users: "https://ctd-todo-api.herokuapp.com/v1/users",
};

class CadastroRepo {
  static criarUsuario({ firstName, lastName, email, password }) {
    const obj = { firstName, lastName, email, password };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(obj),
    };

    return fetch(RECURSOS.users, config);
  }
}

export default CadastroRepo;
