const Role = require('./Role.js');


class Reviewer extends Role{
  constructor(user) {
    super('Revisor', user);
  }

  send_bids(article, session, bid){
    session.receive_bids(article, bid, this._user)
  }



}

module.exports = Reviewer;