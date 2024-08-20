const ReviewArticle = require("./ReviewArticle");

class Article {
  
  constructor(title, attached_file_url) {
    this._title = title;
    this._attached_file_url  = attached_file_url;
    this._authors = [];
    this._notification_author = null;

    // Definí aqui porque los articulos son de las sesiones, los revisores pueden ser de varias sesiones
    this._pending_reviewers = [];
    this._list_interested = [];
    this._list_not_interested = [];
    this._list_maybe = [];
    this._review_article = [];

    this._average_score = 0;
  }

  add_author(author){
    this._authors.push(author);
  }

  authors(){
    return this._authors;
  }

  count_authors(){
    return this._authors.length
  }

  validate_title(){
    return this._title!=''
  }

  set_notification_author(author){
    this._notification_author = author;
  }

  find_user_in_list_interested(user){
    return this._list_interested.some(reviewer => reviewer._email === user._email);
  }
  
  find_user_in_list_maybe(user){
    return this._list_maybe.some(reviewer => reviewer._email === user._email);
  }

  find_user_in_list_not_interested(user){
    return this._list_not_interested.some(reviewer => reviewer._email === user._email);
  }

  add_list(bid, user) {
    switch (bid) {
      case 'Interesado':
        this._list_interested.push(user);
        break;
      case 'Quizas':
        this._list_maybe.push(user);
        break;
      case 'No interesado':
        this._list_not_interested.push(user);
        break;
      default:
        throw new Error('No se reconoce este bid');
    }
  }
  

  remove_in_list_interested(user){
    let index = this._list_interested.findIndex(reviewer => reviewer._email===user._email);
    if (index !== -1) {
      return this._list_interested.splice(index, 1);
    }else{
      return this._list_interested
    }
  }

  remove_in_list_not_interested(user){
    let index = this._list_not_interested.findIndex(reviewer => reviewer._email===user._email);
    if (index !== -1) {
      return this._list_not_interested.splice(index, 1);
    }else{
      return this._list_not_interested
    }
  }

  remove_in_list_maybe(user){
    let index = this._list_maybe.findIndex(reviewer => reviewer._email===user._email);
    if (index !== -1) {
      return this._list_maybe.splice(index, 1);
    }else{
      return this._list_maybe
    }
  }

  process_add_to_lists(bid, user){
    // true es porque esta en alguna lista, lo sacamos y reseteamos
    if (this.find_user_in_list_interested(user)){
      this._list_interested = this.remove_in_list_interested(user)
    }
    if (this.find_user_in_list_not_interested(user)){
      this._list_not_interested = this.remove_in_list_not_interested(user)
    }
    if (this.find_user_in_list_maybe(user)){
      this._list_maybe = this.remove_in_list_maybe(user)
    }
    this.add_list(bid, user)
  }

  find_user_in_list_pending(user){
    return this._pending_reviewers.some(reviewer => reviewer._email === user._email);
  }

  pending_reviewers(){
    return this._pending_reviewers
  }

  list_interested(){
    return this._list_interested;
  }

  list_not_interested(){
    return this._list_not_interested;
  }

  list_list_maybe(){
    return this._list_maybe;
  }

  count_pending_reviewers(){
    return this._pending_reviewers.length
  }

  count_list_interested(){
    return this._list_interested.length;
  }

  count_list_not_interested(){
    return this._list_not_interested.length;
  }

  count_list_maybe(){
    return this._list_maybe.length;
  }


  process_add_to_pending(user){
    if (!this.find_user_in_list_pending(user)){
      this._pending_reviewers.push(user);
    }else{
      throw new Error('Este articulo ya fue enviado a este revisor');
    }
  }

  process_assign_reviewers(){
    const list_interested = this._list_interested.slice(0, 3)
    this._review_article =  list_interested.map(reviewer => new ReviewArticle(reviewer));

    if (this._review_article.length < 3) {
      const num_missing = 3 - this._review_article.length;
      const list_maybe = this._list_maybe.slice(0, num_missing);
      const list_review_maybe = list_maybe.map(reviewer => new ReviewArticle(reviewer));
      this._review_article = this._review_article.concat(list_review_maybe);
    }
    if (this._review_article.length < 3) {
      const num_missing = 3 - this._review_article.length;
      const list_not_interested = this._list_not_interested.slice(0, num_missing);
      const list_review_not_interested = list_not_interested.map(reviewer => new ReviewArticle(reviewer));
      this._review_article = this._review_article.concat(list_review_not_interested);
    }
  }

  confirmed_reviewers(){
    return this._review_article.map(review_article => review_article._reviewer);
  }

  find_in_confirmed_reviewer(user){
    return this._review_article.find(reviewArticle => reviewArticle._reviewer === user);
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
    const total_score = this._review_article.reduce((sum, review_article)=>sum+(review_article._score || 0));
    this._average_score = this._review_article.length ? total_score / this._review_article.length : 0;
  }





}

module.exports = Article;
