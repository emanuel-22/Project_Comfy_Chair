
class SessionState {
  
  constructor(session) {
    this._session = session;
  }

  next_state() {
    throw new Error("Este metodo esta empleado en las subclases");
  }

  add_article(article, send_date) {
    throw new Error("Este metodo esta empleado en las subclases");
  }

}

module.exports = SessionState;