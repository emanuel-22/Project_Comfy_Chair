const Assignment = require("./Assignment");
const SessionState = require("./SessionState");

class Bidding extends SessionState {
  
  constructor(session) {
    super(session);
    this._count_reviews = this.count_reviews();
  }
  
  next_state() {
    this._session.set_state(new Assignment());
  }

  count_reviews(){
    return (this._session.count_articles()*3);
  }

  assign_bids(article, bid, user){
    article.process_add_to_lists(bid, user)
  }


}

module.exports = Bidding;