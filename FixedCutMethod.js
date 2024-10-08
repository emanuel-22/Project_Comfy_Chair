const SelectionMethod = require("./SelectionMethod")
class FixedCutMethod extends SelectionMethod {
  
  constructor(percentage) {
    super();
    this._percentage = this.validated_percentage(percentage);
  }

  validated_percentage(percentage){
    return (percentage/100)
  }

  select(articles) {
    articles.forEach(article => {
      article.calculate_final_score();
    });
    const sorted_articles = articles.sort((a, b) => b.final_score() - a.final_score());
    const cut_off_index = Math.ceil(sorted_articles.length * this._percentage);
    return sorted_articles.slice(0, cut_off_index);
  }
}

module.exports = FixedCutMethod;