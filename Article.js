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

  validated_title(){
    return this._title!=''
  }

  validated_attached_file_url(){
    return this._attached_file_url!=''
  }

  set_notification_author(author){
    this._notification_author = author;
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
      reviewer_article.set_bid(bid);
    }
  }

  count_pending_reviewers(){
    return this._reviewers_article.filter(
      reviewerArticle => reviewerArticle._status_bidding===false
    ).length;
  }

  interesteds(){
    return this._reviewers_article.filter(
      reviewerArticle => reviewerArticle._bid === 'Interesado'
    );
  }

  count_interesteds(){
    return this._reviewers_article.filter(
      reviewerArticle => reviewerArticle._bid === 'Interesado'
    ).length;
  }

  not_interesteds(){
    return this._reviewers_article.filter(
      reviewerArticle => reviewerArticle._bid === 'No interesado'
    );
  }

  count_not_interesteds(){
    return this._reviewers_article.filter(
      reviewerArticle => reviewerArticle._bid === 'No interesado'
    ).length;
  }

  maybes(){
    return this._reviewers_article.filter(
      reviewerArticle => reviewerArticle._bid === 'Quizas'
    );
  }

  count_maybes(){
    return this._reviewers_article.filter(
      reviewerArticle => reviewerArticle._bid === 'Quizas'
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
      reviewer_article.set_status_assigned();
    });
  }

  confirmed_reviewers_article(){
    return this._reviewers_article.filter(
      reviewerArticle => reviewerArticle._status_assigned === true
    );
  }

  confirmed_user_reviewers(){
    return this.confirmed_reviewers_article().map(
      reviewerArticle => reviewerArticle.reviewer() 
    ); 
  }

  reviewers_article(){
    return this._reviewers_article;
  }

  count_confirmed_reviewers_article(){
    return this._reviewers_article.filter(
      reviewerArticle => reviewerArticle && reviewerArticle._status_assigned===true
    ).length;
  }



 



















  

  

 

 

 

 
  

  
 

  find_in_confirmed_reviewer(user){
    return this.confirmed_reviewers_article().find(reviewArticle => reviewArticle._reviewer === user);
  }

  process_score(user, score, text_review){
    const review_article = find_in_confirmed_reviewer(user)
    if (review_article){
      review_article.asign_score(score, text_review);
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
