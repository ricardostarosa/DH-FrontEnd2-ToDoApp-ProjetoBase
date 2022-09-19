class FormataDados {
  static data(data) {
    // createdAt: "2022-09-18T22:27:10.248Z";

    return data
      .match(/(\d{4})-\d{2}-(\d{2})/g)[0]
      .split("-")
      .reverse()
      .join("/");
  }
}

export default FormataDados;
