class FormataDados {
  static data(data) {
    return data
      .match(/(\d{4})-\d{2}-(\d{2})/g)[0]
      .split("-")
      .reverse()
      .join("/");
  }
}

export default FormataDados;
