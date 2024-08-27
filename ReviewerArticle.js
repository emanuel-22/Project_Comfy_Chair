class ReviewerArticle {

  constructor(reviewer) {
    this._reviewer = reviewer;

    this._status_bidding = false; // false es porque esta pendiente de su bid y true es porque ya decidio su bid (interesado, quizas o no interesado )sobre el articulo
    this._bid = '';

    this._status_assigned = false; // false es porque no fue asignado en este articulo y true es porque es un revisor asignado
    this._score = ''; //fuera del rango
    this._text_review = '';
  }

  reviewer(){
    return this._reviewer;
  }

  score(){
    return this._score;
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

  status_assigned(){
    return this._status_assigned;
  }

  text_review(){
    return this._text_review;
  }
 
  
  }
  
  module.exports = ReviewerArticle;