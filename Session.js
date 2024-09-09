const Reception = require('./Reception.js');

class Session {

  constructor(topic_name, session_type, reception_deadline) {
    this._topic_name = topic_name;
    this._session_state = new Reception(this, reception_deadline); // Patron State para manejo de estados por lo que pasa una sesion
    this._session_type = session_type; // Patron Strategy para manejo de tipo de sesion (RegularSession, Workshop y PosterSession)
    this._selection_method = null;
    this._num_max_accepted = 0;

    this._articles = [];
    this._selected_articles = [];
    this._reviewers = [];
  }

  set_session_state(state) {
    this._session_state = state;
  }

  set_session_type(session_type) {
    this._session_type = session_type;
  }

  topic_name(){
    return this._topic_name;
  }

  session_state(){
    return this._session_state
  }

  session_type(){
    return this._session_type
  }

  articles(){
    return this._articles
  }

  count_articles(){
    return this._articles.length
  }

  proceed() {
    this._session_state.proceed();
  }

  get_details() {
    console.log(`La Sesión: ${this._topic_name}`);
    this._articles.forEach(
      article => article.get_details()
    );
  }

  // ---------------------------------Reception------------------------------------
  
  is_accepted(article) {
    return this._session_type.is_accepted(article);
  }

  add_article_to_list(article) {
    this._articles.push(article);
  }

  receive_article(article, notification_author, send_date) {
    this._session_state.add_article(article, notification_author, send_date);
  }

  has_article(some_article){
    return this._articles.some(article => article===some_article);
  }

  // ---------------------------------Bidding------------------------------------

  reviewers(){
    return this._reviewers
  }

  count_reviewers(){
    return this._reviewers.length
  }

  count_reviews(){
    return this.count_articles()*3;;
  }

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

  send_articles_randomly(){
    this._session_state.send_articles_randomly();
  }

  receive_bids(article, bid, user){
    this._session_state.assign_bids(article, bid, user);
  }

  assign_reviewer_to_bid(article, reviewer){
    if (this.find_email(reviewer)) {
      article.process_add_to_pending(reviewer);
    }else{
      throw new Error('Este usuario no es revisor de esta Sesion');
    }
  }

  // ---------------------------------Asignación------------------------------------

  assign_reviewers_to_article(){
    this._session_state.assign_reviewers_to_article()
  }

  // ---------------------------------Revisión------------------------------------

  find_article(some_article){
    return this._articles.some(article => article._title === some_article._title);
  }

  receive_score(article, user, score, text_review){
    let error_message = '';
    if(!this.find_article(article)){
      error_message = 'Este articulo no fue aceptado en la recepción'
    }
    if (score < -3 || score > 3) {
      error_message = 'La calificación esta fuera de rango'
    }
    if (!Number.isInteger(score)) {
      error_message = 'La calificación debe ser un número entero. ';
    }
    if (error_message) {
      throw new Error(error_message.trim());
    }else{
      this._session_state.assign_score(article, user, score, text_review);
    }
  }

  // ---------------------------------Selección------------------------------------

  set_selection_method(selection_method){
    this._selection_method = selection_method;
  }

  start_articles_select() {
    if (this._num_max_accepted!=0) {
      const selected_articles = this._selection_method.select(this._articles);
      this._selected_articles = selected_articles.slice(0, this._num_max_accepted);
    }else{
      throw new Error('No esta definido el número máximo a aceptar de esta sesión');
    }
  }

  selected_articles(){
    return this._selected_articles;
  }

  define_num_max_accepted(num){
    this._num_max_accepted = num;
  }

  num_max_accepted(){
    return this._num_max_accepted;
  }
}

module.exports = Session;