
const Role = require('./Role.js');

class Author extends Role {

  constructor(user) {
    super('Autor', user);
  }
  
  send_article(article, session){
    article.set_notification_author(this._user)
    session.add_article(article)
  }

}

module.exports = Author;