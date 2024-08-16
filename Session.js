const Reception = require('./Reception.js');

class Session {

  constructor(topic_name, session_type, reception_deadline) {
    this._topic_name = topic_name;
    this._session_state = new Reception(this, reception_deadline); // Patron State para manejo de estados por lo que pasa una sesion
    this._session_type = session_type; // Patron Strategy para manejo de tipo de sesion (RegularSession, Workshop y PosterSession)
    this._reception_deadline = reception_deadline;
    this._articles = [];
    this._reviewers = [];
    this._count_reviews = 0;
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
          //console.log(`----------El revisor ${reviewer._name} revisará: ${article._title}--------------------`);
          article.process_add_to_pending(reviewer);
          assigned_count++;
        }
        start_index = (start_index + num_articles_to_assign) % this.count_articles();
      } 
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

  count_reviews(){
    return this.count_articles()*3
  }

  assign_reviewers_to_article(){
    this._articles.forEach(article => {
      this._session_state.assign_reviewers(article);
    });
  }
  


}

module.exports = Session;