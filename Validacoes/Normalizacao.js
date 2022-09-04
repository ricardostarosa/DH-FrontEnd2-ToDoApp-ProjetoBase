// To check a password between 7 to 15 characters which contain at least one numeric digit and a special character

class Valida {
  static getRidOfSpaces(texto) {
    return texto.trim();
  }

  static isEmpty(texto) {
    return !texto || /^[\n\r\t ]+$/g.test(texto);
  }

  static isEmailValid(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g.test(email);
  }

  static isButtonLock(list) {
    return list.every((item) => item);
  }

  static isPasswordValid(password) {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/g.test(
      password
    );
  }

  static mensagemErro(objValidacao) {
    const erros = [
      {
        tipo: "checaEmail",
        valido: this.isEmailValid,
        mensagem:
          "Digite um formato válido de email. Ex: meunome@gmail.com.br | meunome@gmail.com ",
      },
      {
        tipo: "checaSenha",
        valido: this.isPasswordValid,
        mensagem:
          "A senha de ter entre 7 e 15 caracteres com pelo menos uma letra ou caractere especial.",
      },
    ];

    return erros.filter((item) => {
      const { tipo } = item;

      if (!objValidacao[tipo]) return false;

      return !item.valido(objValidacao[tipo]);
    });
  }
}

export default Valida;
