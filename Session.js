const Reception = require('./Reception.js');

class Session {

  constructor(topic_name, session_type, reception_deadline) {
    this._topic_name = topic_name;
    this._session_state = new Reception(this, reception_deadline); // Patron State para manejo de estados por lo que pasa una sesion
    this._session_type = session_type; // Patron Strategy para manejo de tipo de sesion (RegularSession, Workshop y PosterSession)
    this._reception_deadline = reception_deadline;
    this._articles = [];
    this._reviewers = [];
  }

  set_state(state, reception_deadline) {
    this._session_state = state;
    this._reception_deadline = reception_deadline
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

  find_article(some_article){
    return this._articles.some(article => article._title === some_article._title);
  }

  receive_article(article, send_date) {
    this._session_state.add_article(article, send_date);
  }

  receive_bids(article, bid, user){
    if(this.find_article(article)){
      this._session_state.assign_bids(article, bid, user);
    }else{
      throw new Error('Este articulo no fue aceptado en la recepción');
    }
  }


  send_articles_randomly(){
    if (this.count_articles()!=0){
      this._articles.forEach(article => { 
        let reviewer_random = this._reviewers[Math.floor(Math.random() * this._reviewers.length)];
        if (!article.find_user_in_list_pending(reviewer_random)){
          console.log(`El Artículo "${article._title}" fue asignado a ${reviewer_random._last_name} ${reviewer_random._name}`);
          article.process_add_to_pending(reviewer_random);
        } 
      });
    }else{
      throw new Error('La sesion no tiene articulos');
    }
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

  proceed() {
    this._session_state.next_state();
  }

  // se considera al email como identificador unico de registro del congreso
  find_email(user){
    return this._reviewers.some(reviewer => reviewer._email === user._email);
  }

  add_reviewer(user){
    if (!this.find_email(user)) {
      var reviewerRole = user.find_role('Revisor')
      if (!reviewerRole) {
        user.add_role('Revisor');
      }
      this._reviewers.push(user);
    } else {
      throw new Error('Este usuario ya es revisor de esta Sesion');
    }
  }

  reviewers(){
    return this._reviewers
  }

  count_reviewers(){
    return this._reviewers.length
  }

  count_articles(){
    return this._articles.length
  }

 


}

module.exports = Session;