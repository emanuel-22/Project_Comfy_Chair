
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
    session.receive_article(article, this._user, send_date);
  }
 
}

module.exports = Author;