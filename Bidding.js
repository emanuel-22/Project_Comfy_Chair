const Assignment = require("./Assignment");
const SessionState = require("./SessionState");

class Bidding extends SessionState {
  
  constructor(session) {
    super(session);
  }

  name_state(){
    return 'Bidding'
  }
  
  next_state() {
    this._session.set_state(new Assignment(this._session));
  }

  add_article(article, send_date) {
    throw new Error('Durante esta instancia, ya no se aceptan más articulos');
  }

  assign_bids(article, bid, user){
    article.process_assign_bid(bid, user)
  }
}

module.exports = Bidding;