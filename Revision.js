const Selection = require("./Selection");
const SessionState = require("./SessionState");

class Revision extends SessionState {

  constructor(session) {
    super(session);
  }
  
  name_state(){
    return 'Revision'
  }

  next_state() {
    this._session.set_state(new Selection(this._session));
  }
  
  add_article(article, send_date) {
    throw new Error('Durante esta instancia, ya no se aceptan mas articulos');
  }

  assign_score(article, user, score, text_review) {
    article.process_score(user, score, text_review)
  }

}

module.exports = Revision;