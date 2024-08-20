const Revision = require("./Revision");
const SessionState = require("./SessionState");

class Assignment extends SessionState {

  constructor(session) {
    super(session);
  }

  next_state() {
    this._session.set_state(new Revision());
  }

  add_article(article, send_date) {
    throw new Error('Durante esta instancia, ya no se aceptan mas articulos');
  }

  assign_reviewers(article) {
    article.process_assign_reviewers();
  }
  

}

module.exports = Assignment;