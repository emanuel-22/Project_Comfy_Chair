const Role = require('./Role.js');


class Reviewer extends Role{
  constructor(user) {
    super('Revisor', user);
  }

  send_bids(article, session, bid){
    session.receive_bids(article, bid, this._user)
  }

  send_score(article, session, score, text){
    session.receive_score(article, score, this._user, text)
  }

}

module.exports = Reviewer;