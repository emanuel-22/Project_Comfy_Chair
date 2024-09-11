const Revision = require("./Revision");
const SessionState = require("./SessionState");

class Assignment extends SessionState {

  constructor(session) {
    super(session);
  }

  name_state(){
    return 'Asignacion'
  }

  proceed() {
    this._session.set_session_state(new Revision(this._session));
  }

  add_article(article, notification_author, send_date) {
    throw new Error('Durante esta instancia, ya no se aceptan mas articulos');
  }

  assign_reviewers_to_article(){
    this._session._articles.forEach(article => {
      article.process_assign_reviewers();
    });
  }
  

}

module.exports = Assignment;