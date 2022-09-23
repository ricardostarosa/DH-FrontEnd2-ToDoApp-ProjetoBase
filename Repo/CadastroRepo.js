const RECURSOS = {
  users: "https://ctd-fe2-todo-v2.herokuapp.com/v1/users",
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
