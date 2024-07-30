const Article = require('./Article.js');


class RegularArticle extends Article {
  constructor() {
    super();
  }

  get_type() {
    return 'regular';
  }
}

module.exports = RegularArticle;