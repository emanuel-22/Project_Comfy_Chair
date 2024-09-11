const Assignment = require("./Assignment");
const SessionState = require("./SessionState");

class Bidding extends SessionState {
  
  constructor(session) {
    super(session);
  }

  name_state(){
    return 'Bidding'
  }
  
  proceed() {
    this._session.set_session_state(new Assignment(this._session));
  }

  add_article(article, notification_author, send_date) {
    throw new Error('Durante esta instancia, ya no se aceptan más articulos');
  }

  send_articles_randomly(){
    let error_message = '';
    if (this._session.count_reviewers()==0){
      error_message = 'La sesión no tiene revisores';
    }
    if (this._session.count_articles()==0){
      error_message = 'La sesión no tiene articulos';
    }
    if (this._session.count_reviewers()<3){
      error_message = 'La cantidad de revisores no satisface la cantidad de revisiones';
    }
    if (error_message) {
      throw new Error(error_message.trim());
    }else{
      let copy_articles = this._session.articles();
      let copy_reviewers = this._session.reviewers();
      copy_articles.sort(() => Math.random() - 0.5);
      copy_reviewers.sort(() => Math.random() - 0.5);

      let start_index = 0;
      let num_articles_to_assign = Math.floor(this._session.count_reviews() / this._session.count_reviewers());

      for (let reviewerIndex = 0; reviewerIndex < this._session.count_reviewers(); reviewerIndex++) {
        let reviewer = copy_reviewers[reviewerIndex];
        let assigned_count = 0;
        while (assigned_count < num_articles_to_assign) {
          let articleIndex = (start_index + assigned_count) % this._session.count_articles();
          let article = copy_articles[articleIndex];
          article.process_add_to_pending(reviewer);
          assigned_count++;
        }
        start_index = (start_index + num_articles_to_assign) % this._session.count_articles();
      } 
    }
  }

  assign_bids(article, bid, user){
    if(this._session.find_article(article)){
      article.process_assign_bid(bid, user);
    }else{
      throw new Error('Este articulo no fue aceptado en la recepción');
    }
  }
}

module.exports = Bidding;