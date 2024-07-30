const Selection = require("./Selection");
const SessionState = require("./SessionState");

class Revision extends SessionState {

  next_state() {
    this._session.set_state(new Selection());
  }

}

module.exports = Revision;