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
    this._final_score = 0;
  }

  validated_title(){
    return this._title!=''
  }

  validated_attached_file_url(){
    return this._attached_file_url!=''
  }

  set_notification_author(author){
    this._notification_author = author;
  }

  notification_author(){
    return this._notification_author;
  }

  send_notification(message){
    this._notification_author.receive_notification(message);
  }

  has_author(user){
    return this._authors.some(author => author && author.user() === user);
  }

  add_author(user){
    if (!this.has_author(user)){
      if(!user.has_role('Autor')){
        user.add_role('Autor');
      }
      let author = user.find_role('Autor');
      this._authors.push(author);
    }else{
      throw new Error('Este usuario ya es autor de este artículo');
    } 
  }

  authors(){
    return this._authors;
  }

  count_authors(){
    return this._authors.length
  }

  has_user_in_list_reviewer(user){
    return this._reviewers_article.some(reviewer_article => reviewer_article && reviewer_article.reviewer()===user);
  }

  find_user_in_list_reviewer(user){
    return this._reviewers_article.find(reviewer_article => reviewer_article && reviewer_article.reviewer()===user);
  }

  set_reviewers_article(new_reviewer){
    this._reviewers_article.push(new_reviewer);
  }

  process_add_to_pending(user){
    if (!this.has_user_in_list_reviewer(user)){
      const new_reviewer = new ReviewerArticle(user);
      this.set_reviewers_article(new_reviewer);
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
        this.set_reviewers_article(reviewer_article);
      }
      // se cambia a personas que fueron asignadas el bid
      reviewer_article.set_bid(bid);
      reviewer_article.change_true_status_bidding(); // pasamos a true
    }
  }

  count_pending_reviewers(){
    return this._reviewers_article.filter(
      reviewerArticle => reviewerArticle.status_bidding()===false
    ).length;
  }

  interesteds(){
    return this._reviewers_article.filter(
      reviewerArticle => reviewerArticle.bid()==='Interesado'
    );
  }

  count_interesteds(){
    return this._reviewers_article.filter(
      reviewerArticle => reviewerArticle.bid()==='Interesado'
    ).length;
  }

  not_interesteds(){
    return this._reviewers_article.filter(
      reviewerArticle => reviewerArticle.bid()==='No interesado'
    );
  }

  count_not_interesteds(){
    return this._reviewers_article.filter(
      reviewerArticle => reviewerArticle.bid()==='No interesado'
    ).length;
  }

  maybes(){
    return this._reviewers_article.filter(
      reviewerArticle => reviewerArticle.bid()==='Quizas'
    );
  }

  count_maybes(){
    return this._reviewers_article.filter(
      reviewerArticle => reviewerArticle.bid()==='Quizas'
    ).length;
  }

  process_assign_reviewers(){
    let reviewersToAssign = this.interesteds().slice(0, 3);

    if (reviewersToAssign.length < 3) {
      const num_missing = 3 - reviewersToAssign.length;
      const list_maybes = this.maybes().slice(0, num_missing);
      reviewersToAssign = reviewersToAssign.concat(list_maybes);
    }
    if (reviewersToAssign.length < 3) {
      const num_missing = 3 - reviewersToAssign.length;
      const list_not_interested = this.not_interesteds().slice(0, num_missing);
      reviewersToAssign = reviewersToAssign.concat(list_not_interested);
    }

    reviewersToAssign.forEach((item) => {
      const reviewer_article = this._reviewers_article.find(r => r===item);
      reviewer_article.change_true_status_assigned();
    });
  }

  reviewers_article(){
    return this._reviewers_article;
  }

  //---------Estos son los revisores confirmados--------------

  confirmed_reviewers_article(){
    return this._reviewers_article.filter(
      reviewerArticle => reviewerArticle.status_assigned()===true
    );
  }

  count_confirmed_reviewers_article(){
    return this.confirmed_reviewers_article().length;
  }

  confirmed_user_reviewers(){
    return this.confirmed_reviewers_article().map(
      reviewerArticle => reviewerArticle.reviewer() 
    ); 
  }

  confirmed_score_reviewers(){
    return this.confirmed_reviewers_article().map(
      reviewerArticle => reviewerArticle.score() 
    ); 
  }

  confirmed_text_review_reviewers(){
    return this.confirmed_reviewers_article().map(
      reviewerArticle => reviewerArticle.text_review() 
    ); 
  }

  find_in_confirmed_reviewer(user){
    return this.confirmed_reviewers_article().find(
      reviewArticle => (reviewArticle && reviewArticle.status_assigned()===true && reviewArticle.reviewer()===user)
    );
  }

  process_score(user, score, text_review){
    const review_article = this.find_in_confirmed_reviewer(user)
    if (review_article){
      review_article.asign_score(score, text_review);
    }else{
      throw new Error('Este revisor no esta confirmado para revisar este artículo');
    }
  }

  final_score(){
    return this._final_score;
  }

  calculate_final_score(){
    const confirmedReviewers = this.confirmed_reviewers_article();
    const total_score = confirmedReviewers.reduce((sum, review_article) => sum + (review_article.score() || 0), 0);
    //const value_average_score = this.confirmed_reviewers_article().length ? total_score / this.count_confirmed_reviewers_article() : 0;
    this._final_score = total_score;
  }

  
}

module.exports = Article;
