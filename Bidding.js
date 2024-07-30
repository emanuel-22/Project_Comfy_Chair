const Assignment = require("./Assignment");
const SessionState = require("./SessionState");

class Bidding extends SessionState {
  next_state() {
    this._session.set_state(new Assignment());
  }

}

module.exports = Bidding;