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
    } else {
      throw new Error('El articulo fue rechazado');
    }
  }

}

module.exports = Reception;