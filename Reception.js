const Bidding = require("./Bidding");
const SessionState = require("./SessionState");

class Reception extends SessionState {

  next_state() {
    this._session.set_state(new Bidding());
  }

}

module.exports = Reception;