const Reception = require('./Reception.js');

class Session {

  constructor(topic_name, session_type, reception_deadline) {
    this._topic_name = topic_name;
    this._session_state = new Reception(this, reception_deadline); // Patron State para manejo de estados por lo que pasa una sesion
    this._session_type = session_type; // Patron Strategy para manejo de tipo de sesion (RegularSession, Workshop y PosterSession)
    this._reception_deadline = reception_deadline
    this._articles = [];
  }

  set_state(state) {
    this._state = state;
  }

  set_type_session(session_type) {
    this._session_type = session_type;
  }

  session_type(){
    return this._session_type
  }

  session_state(){
    return this._session_state
  }

  receive_article(article, send_date) {
    this._session_state.add_article(article, send_date);
  }

  is_accepted(article) {
    return this._session_type.is_accepted(article);
  }

  add_article_to_list(article) {
    this._articles.push(article);
  }

  articles(){
    return this._articles
  }

}

module.exports = Session;