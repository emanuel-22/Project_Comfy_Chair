const SessionState = require("./SessionState");
const Bidding = require("./Bidding");


class Reception extends SessionState {

  constructor(session, reception_deadline) {
    super(session);
    this._reception_deadline = reception_deadline
  }

  next_state() {
    this._session.set_state(new Bidding(this._session));
  }

  validated_dates(send_date){
    return (send_date<=this._reception_deadline)
  }

  add_article(article, send_date) {
    if (this._session.is_accepted(article) && this.validated_dates(send_date)) {
      this._session.add_article_to_list(article)
    } else {
      throw new Error('El articulo fue rechazado en esta Sesión');
    }
  }

}

module.exports = Reception;