const Revision = require("./Revision");
const SessionState = require("./SessionState");

class Assignment extends SessionState {
  next_state() {
    this._session.set_state(new Revision());
  }

}

module.exports = Assignment;