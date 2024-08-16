const Selection = require("./Selection");
const SessionState = require("./SessionState");

class Revision extends SessionState {

  next_state() {
    this._session.set_state(new Selection());
  }
  
  add_article(article, send_date) {
    throw new Error('Durante esta instancia, ya no se aceptan mas articulos');
  }

}

module.exports = Revision;