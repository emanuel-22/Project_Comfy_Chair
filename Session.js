const Reception = require('./Reception.js');

class Session {

  constructor(topic_name, type_session) {
    this._topic_name = topic_name;
    this._state = new Reception(); // Patron State para manejo de estados por lo que pasa una sesion
    this._type_session = type_session; // Patron Strategy para manejo de tipo de sesion (RegularSession, Workshop y PosterSession)
    this._articles = [];
  }

  set_state(state) {
    this._state = state;
  }

  set_type_session(type_session) {
    this._type_session = type_session;
  }

  type_session(){
    return this._type_session
  }

  add_article(article) {
    if (this._type_session.isArticleAccepted(article)) {
      this._articles.push(article);
    } else {
      throw new Error("No se puede agregar este articulo a esta session");    
    }
  }

}

module.exports = Session;