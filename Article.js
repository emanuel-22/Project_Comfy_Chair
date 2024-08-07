class Article {
  
  constructor(title, attached_file_url) {
    this._title = title;
    this._attached_file_url  = attached_file_url;
    this._authors = []
    this._notification_author = null;
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

}

module.exports = Article;
