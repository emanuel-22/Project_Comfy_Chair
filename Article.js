const ReviewerArticle = require("./ReviewerArticle");

class Article {
  
  constructor(title, attached_file_url) {
    this._title = title;
    this._attached_file_url  = attached_file_url;

    // Estos atributos son comunes a ambos tipos de Article
    this._notification_author = null;
    this._authors = [];

    // Definí aqui porque los articulos son de las sesiones, los revisores pueden ser de varias sesiones
    this._reviewers_article = [];
    this._average_score = 0;
  }

  authors(){
    return this._authors;
  }

  count_authors(){
    return this._authors.length
  }

  add_author(author){
    this._authors.push(author);
  }

  validated_title(){
    return this._title!=''
  }

  set_notification_author(author){
    this._notification_author = author;
  }

  has_user_in_list_reviewer(user){
    return this._reviewers_article.some(reviewer_article => reviewer_article.reviewer_email()===user._email);
  }

  find_user_in_list_reviewer(user){
    return this._reviewers_article.find(reviewer_article => reviewer_article.reviewer_email()===user._email);
  }

  process_add_to_pending(user){
    if (!this.has_user_in_list_reviewer(user)){
      const new_reviewer = new ReviewerArticle(user)
      this._reviewers_article.push(new_reviewer);
    }else{
      throw new Error('Este articulo ya fue enviado a este revisor');
    }
  }

  process_assign_bid(bid, user){
    const validBids = ['Interesado', 'Quizas', 'No interesado'];
    if (!validBids.includes(bid)) {
      throw new Error('No se reconoce este bid');
    }
    else{
      let reviewer_article;
      if (this.has_user_in_list_reviewer(user)) {
        reviewer_article = this.find_user_in_list_reviewer(user);
      } else {
        // Crear un nuevo ReviewerArticle si el usuario no está en la lista
        reviewer_article = new ReviewerArticle(user);
        this._reviewers_article.push(reviewer_article);
      }
      reviewer_article.set_bid(bid);
    }
  }

  count_pending_reviewers(){
    return this._reviewers_article.filter(
      reviewerArticle => reviewerArticle._status_bidding===false
    ).length;
  }

  interested(){
    return this._reviewers_article.filter(
      reviewerArticle => reviewerArticle._bid === 'Interesado'
    );
  }

  count_interested(){
    return this._reviewers_article.filter(
      reviewerArticle => reviewerArticle._bid === 'Interesado'
    ).length;
  }

  not_interested(){
    return this._reviewers_article.filter(
      reviewerArticle => reviewerArticle._bid === 'No interesado'
    );
  }

  count_not_interested(){
    return this._reviewers_article.filter(
      reviewerArticle => reviewerArticle._bid === 'No interesado'
    ).length;
  }

  maybe(){
    return this._reviewers_article.filter(
      reviewerArticle => reviewerArticle._bid === 'Quizas'
    );
  }

  count_maybe(){
    return this._reviewers_article.filter(
      reviewerArticle => reviewerArticle._bid === 'Quizas'
    ).length;
  }

  process_assign_reviewers(){
    let reviewersToAssign = this.interested().slice(0, 3);

    if (reviewersToAssign.length < 3) {
      const num_missing = 3 - reviewersToAssign.length;
      const list_maybe = this.maybe().slice(0, num_missing);
      reviewersToAssign = reviewersToAssign.concat(list_maybe);
    }
    if (reviewersToAssign.length < 3) {
      const num_missing = 3 - reviewersToAssign.length;
      const list_not_interested = this.not_interested().slice(0, num_missing);
      reviewersToAssign = reviewersToAssign.concat(list_not_interested);
    }
    this._reviewers_article = reviewersToAssign.map(reviewer_article => {
      reviewer_article._status_assigned = true;
    });
  }

  confirmed_reviewers_article(){
    return this._reviewers_article.filter(
      reviewerArticle => reviewerArticle._status_assigned === true
    );
  }

  confirmed_reviewers(){
    return this.confirmed_reviewers_article().map(
      reviewerArticle => reviewerArticle.reviewer()
    ); 
  }

  find_in_confirmed_reviewer(user){
    return this.confirmed_reviewers_article().find(reviewArticle => reviewArticle._reviewer === user);
  }

  process_score(score, user, text){
    const review_article = find_in_confirmed_reviewer(user)
    if (review_article){
      review_article.asign_score(score, text);
    }else{
      throw new Error('Este revisor no esta confirmado para revisar este artículo');
    }
  }


  calculate_average_score(){
    const total_score = this.confirmed_reviewers_article().reduce((sum, review_article)=>sum+(review_article._score || 0));
    this._average_score = this.confirmed_reviewers_article().length ? total_score / this._review_article.length : 0;
  }





}

module.exports = Article;
