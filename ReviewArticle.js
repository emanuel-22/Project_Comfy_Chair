class ReviewArticle {

  constructor(reviewer) {
    this._reviewer = reviewer;
    this._score = null;
    this._text = ''
  }

  asign_score(score, text){
    this._score = score;
    this._text = text
  }

}

module.exports = ReviewArticle;