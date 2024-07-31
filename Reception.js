const SessionState = require("./SessionState");

class Reception extends SessionState {

  constructor(session) {
    super(session);
  }

  next_state() {
    this._session.set_state(new Bidding(this._session));
  }

  add_article(article) {
    if (this._session.is_accepted(article)) {
      this._session.add_article_to_list(article)
      console.log('Articulo agregado en la etapa de recepcion');
    } else {
      console.log('Articulo rechazado en la etapa de recepcion');
      throw new Error('El articulo fue rechazado');
    }
  }

}

module.exports = Reception;