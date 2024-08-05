
const Role = require('./Role.js');

class Author extends Role {

  constructor() {
    super('Autor');
  }
  
  send_article(article, session){
    article.set_notification_author(this)
    session.add_article(article)
  }

}

module.exports = Author;