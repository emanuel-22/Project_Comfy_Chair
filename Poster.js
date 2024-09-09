const Article = require('./Article.js');


class Poster extends Article {
  constructor(title, attached_file_url, sources_url) {
    super(title, attached_file_url);
    this._sources_url = sources_url; 
  }

  get_type() {
    return 'Poster';
  }

  get_details() {
    console.log(`El Articulo Poster: ${this._title}`);
  }
}

module.exports = Poster;