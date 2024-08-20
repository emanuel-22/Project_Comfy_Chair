const SessionState = require("./SessionState");

class Selection extends SessionState {

  constructor(session) {
    super(session);
  }

  add_article(article, send_date) {
    throw new Error('Durante esta instancia, ya no se aceptan mas articulos');
  }
}

module.exports = Selection;