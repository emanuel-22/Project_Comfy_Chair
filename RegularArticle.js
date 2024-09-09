const Article = require('./Article.js');


class RegularArticle extends Article {
  constructor(title, attached_file_url, abstract){
    super(title, attached_file_url);
    this._abstract = abstract; 
  }

  get_type() {
    return 'Regular';
  }

  validated_abstract(){
    var words = this._abstract.split(' ');
    return words.length<300;
  }

  get_details() {
    console.log(`El Articulo Regular: ${this._title}`);
  }

}

module.exports = RegularArticle;