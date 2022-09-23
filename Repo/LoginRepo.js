const RECURSOS = {
  login: "https://ctd-fe2-todo-v2.herokuapp.com/v1/users/login",
};

class LoginRepo {
  static loginUsuario({ email, password }) {
    const obj = { email, password };

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(obj),
    };

    return fetch(RECURSOS.login, config);
  }
}

export default LoginRepo;
