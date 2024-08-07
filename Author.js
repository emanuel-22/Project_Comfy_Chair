
const Role = require('./Role.js');

class Author extends Role {

  constructor(user) {
    super('Autor', user);
  }
  
  send_article(article, session, send_date){
    article.set_notification_author(this._user)
    session.receive_article(article, send_date)
  }

}

module.exports = Author;