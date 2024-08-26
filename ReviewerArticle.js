class ReviewerArticle {

  constructor(reviewer) {
    this._reviewer = reviewer;

    this._status_bidding = false; // false es porque esta pendiente de su bid y true es porque ya decidio su bid (interesado, quizas o no interesado )sobre el articulo
    this._bid = '';

    this._status_assigned = false; // false es porque no fue asignado en este articulo y true es porque es un revisor asignado
    this._score = -4; //fuera del rango
    this._text_review = '';
  }

  reviewer(){
    return this._reviewer;
  }

  reviewer_email(){
    return this._reviewer._email;
  }

  set_bid(bid){
    this._bid = bid;
    this._status_bidding = true
  }

  asign_score(score, text){
    this._score = score;
    this._text_review = text
  }

  set_status_assigned(){
    this._status_assigned = true;
  }
 
  
  }
  
  module.exports = ReviewerArticle;