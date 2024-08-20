const Selection = require("./Selection");
const SessionState = require("./SessionState");

class Revision extends SessionState {

  constructor(session) {
    super(session);
  }

  next_state() {
    this._session.set_state(new Selection());
  }
  
  add_article(article, send_date) {
    throw new Error('Durante esta instancia, ya no se aceptan mas articulos');
  }

  assign_score(article, score, user, text) {
    article.process_score(score, user, text)
  }

}

module.exports = Revision;