const SelectionMethod = require("./SelectionMethod");


class BestMethod extends SelectionMethod {
  constructor(limit) {
    super();
    this._limit = limit;
  }

  select(articles) {
    articles.forEach(article => {
      article.calculate_final_score();
    });
    return articles.filter(article => article.final_score() > this._limit);
  }
}

module.exports = BestMethod;