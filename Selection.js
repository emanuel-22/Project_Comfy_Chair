const SessionState = require("./SessionState");

class Selection extends SessionState {

  constructor(session) {
    super(session);
  }

  name_state(){
    return 'Seleccion'
  }

  add_article(article, send_date) {
    throw new Error('Durante esta instancia, ya no se aceptan mas articulos');
  }

  start_articles_select(){
    this._session.start_articles_select();
  }
}

module.exports = Selection;