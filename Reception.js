const SessionState = require("./SessionState");
const Bidding = require("./Bidding");


class Reception extends SessionState {

  constructor(session, reception_deadline) {
    super(session);
    this._reception_deadline = reception_deadline
  }

  name_state(){
    return 'Recepción'
  }

  proceed() {
    this._session.set_session_state(new Bidding(this._session));
  }

  validated_dates(send_date){
    return (send_date<=this._reception_deadline)
  }

  add_article(article, notification_author, send_date) {
    if (this._session.is_accepted(article) && this.validated_dates(send_date)) {
      this._session.add_article_to_list(article);
      article.set_notification_author(notification_author);
      article.notification_author().receive_notification(this.name_state());
    } else {
      throw new Error('El articulo fue rechazado en esta Sesión');
    }
  }

}

module.exports = Reception;