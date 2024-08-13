class Article {
  
  constructor(title, attached_file_url) {
    this._title = title;
    this._attached_file_url  = attached_file_url;
    this._authors = [];
    this._notification_author = null;

    this._list_interested = [];
    this._list_not_interested = [];
    this._list_maybe = [];
    this._list_pending_reviewers = [];
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

  add_list(bid, user){
    switch (bid) {
      case 'Interesado':
        this._list_interested.push(user);
      case 'Quizas':
        this._list_maybe.push(user);
      case 'No interesado':
        this._list_not_interested.push(user);
      default:
        throw new Error('No se reconoce este bid');
    }
  }

  remove_in_list_interested(user){
    this._list_interested.filter(reviewer => reviewer._email !== user._email);
  }

  remove_in_list_not_interested(user){
    this._list_not_interested.filter(reviewer => reviewer._email !== user._email);
  }

  remove_in_list_maybe(user){
    this._list_maybe.filter(reviewer => reviewer._email !== user._email);
  }

  process_add_to_lists(bid, user){
    // true es porque esta en alguna lista, lo sacamos y reseteamos
    if (this.find_user_in_list_interested(user)){
      this.remove_in_list_interested(user)
    }
    if (this.find_user_in_list_interested(user)){
      this.remove_in_list_interested(user)
    }
    if (this.find_user_in_maybe(user)){
      this.remove_in_list_maybe(user)
    }
    this.add_list(bid, user)
  }

  find_user_in_list_pending(user){
    return this._list_pending_reviewers.some(reviewer => reviewer._email === user._email);
  }

  list_pending_reviewers(){
    return this._list_pending_reviewers
  }

  count_list_pending_reviewers(){
    return this._list_pending_reviewers.length
  }

  process_add_to_pending(user){
    if (!this.find_user_in_list_pending(user)){
      this._list_pending_reviewers.push(user);
    }else{
      throw new Error('Este articulo ya fue enviado a este revisor');
    }
  }


}

module.exports = Article;
