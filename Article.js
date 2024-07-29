class Article {
  
  constructor(title, attached_file_url) {
    this._title = title;
    this._attached_file_url  = attached_file_url;
    this._authors = []
  }

  add_author(author){
    this._authors.push(author);
  }

  authors(){
    return this._authors;
  }


}

module.exports = Article;
