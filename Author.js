
const Role = require('./Role.js');

class Author extends Role {

  constructor(user) {
    super(user);
  }
  
  user(){
    return this._user;
  }

  name(){
    return 'Autor';
  }
  
  send_article(article, session, send_date){
    article.set_notification_author(this._user);
    session.receive_article(article, send_date);
  }
 
}

module.exports = Author;