const Reception = require('./Reception.js');

class Session {

  constructor(topic_name, session_type, reception_deadline) {
    this._topic_name = topic_name;
    this._session_state = new Reception(this, reception_deadline); // Patron State para manejo de estados por lo que pasa una sesion
    this._session_type = session_type; // Patron Strategy para manejo de tipo de sesion (RegularSession, Workshop y PosterSession)
    this._count_reviews = 0;
    this._selection_method = null;
    this._num_max_accepted = 0;

    this._articles = [];
    this._reviewers = [];
  }

  set_state(state) {
    this._session_state = state;
  }

  set_type_session(session_type) {
    this._session_type = session_type;
  }

  session_state(){
    return this._session_state
  }

  session_type(){
    return this._session_type
  }

  session_name_state(){
    return this._session_state.name_state();
  }

  articles(){
    return this._articles
  }

  count_articles(){
    return this._articles.length
  }

  proceed() {
    this._session_state.next_state();
  }

  // ---------------------------------Reception------------------------------------
  is_accepted(article) {
    return this._session_type.is_accepted(article);
  }

  add_article_to_list(article) {
    this._articles.push(article);
  }

  receive_article(article, send_date) {
    this._session_state.add_article(article, send_date);
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
    return this.count_articles()*3
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
    let error_message = '';
    if (this.count_reviewers()==0){
      error_message = 'La sesión no tiene revisores';
    }
    if (this.count_articles()==0){
      error_message = 'La sesión no tiene articulos';
    }
    if (this.count_reviewers()<3){
      error_message = 'La cantidad de revisores no satisface la cantidad de revisiones';
    }
    if (error_message) {
      throw new Error(error_message.trim());
    }else{
      let copy_articles = this.articles();
      let copy_reviewers = this.reviewers();
      copy_articles.sort(() => Math.random() - 0.5);
      copy_reviewers.sort(() => Math.random() - 0.5);

      let start_index = 0;
      let num_articles_to_assign = Math.floor(this.count_reviews() / this.count_reviewers());

      for (let reviewerIndex = 0; reviewerIndex < this.count_reviewers(); reviewerIndex++) {
        let reviewer = copy_reviewers[reviewerIndex];
        let assigned_count = 0;
        while (assigned_count < num_articles_to_assign) {
          let articleIndex = (start_index + assigned_count) % this.count_articles();
          let article = copy_articles[articleIndex];
          article.process_add_to_pending(reviewer);
          assigned_count++;
        }
        start_index = (start_index + num_articles_to_assign) % this.count_articles();
      } 
    }
  }

  receive_bids(article, bid, user){
    if(this.find_article(article)){
      this._session_state.assign_bids(article, bid, user);
    }else{
      throw new Error('Este articulo no fue aceptado en la recepción');
    }
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
    this._articles.forEach(article => {
      this._session_state.assign_reviewers(article);
    });
  }





























  


  

 











  find_article(some_article){
    return this._articles.some(article => article._title === some_article._title);
  }


  

 

  
 

 

  
 

  

  receive_score(article, score, user, text){
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
      this._session_state.assign_score(article, user, score, text);
    }
  }

  define_num_max_accepted(num){
    this._num_max_accepted = num;
  }

  num_max_accepted(){
    return this._num_max_accepted;
  }
  

  set_selection_method(selection_method){
    this._selection_method = selection_method;
  }

  start_articles_select() {
    return this._selection_method.select(this._articles);
  }

}

module.exports = Session;