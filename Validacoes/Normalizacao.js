class Valida {
  static getRidOfSpaces(texto) {
    return texto.trim();
  }

  static isNameValid(nome) {
    return /^[a-z]{3,30}$/gi.test(nome);
  }

  static isSurnameValid(nome) {
    return /^(?! )[a-z ]{3,30}$/gi.test(nome);
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

  static isDataSame({ data1, data2 }) {
    return data1 === data2;
  }

  static checkTaskLength(tarefa) {
    return /^(?! )[a-z ]{3,50}$/gi.test(tarefa.trim());
  }

  static mensagemErro(objValidacao) {
    const erros = [
      {
        tipo: "checaTarefa",
        valido: this.checkTaskLength,
        mensagem: "A tarefa de ter no mínimo 5 caracteres.",
      },
      {
        tipo: "checaNome",
        valido: this.isNameValid,
        mensagem: "O nome de ter somente letras e no mínimo 3 caracteres.",
      },

      {
        tipo: "checaSobrenome",
        valido: this.isSurnameValid,
        mensagem:
          "O sobrenome de ter somente letras e no mínimo 3 e no máximo 30 caracteres.",
      },
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

      {
        tipo: "checaRepetirSenha",
        valido: this.isDataSame,
        mensagem: 'Digite a mesma senha digitada no campo "Senha".',
      },
    ];

    return erros.filter((item) => {
      const { tipo } = item;

      if (!(tipo in objValidacao)) return false;

      return !item.valido(objValidacao[tipo]);
    });
  }
}

export default Valida;
