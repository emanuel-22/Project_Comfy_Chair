const Article = require('./Article.js');


class Poster extends Article {
  constructor() {
    super();
  }

  get_type() {
    return 'poster';
  }
}

module.exports = Poster;