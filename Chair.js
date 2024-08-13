const Conference = require('./Conference.js');
const Role = require('./Role.js');

class Chair extends Role {

  constructor(user) {
    super('Chair', user);
  }
  
  create_conference(name, from_date, from_hour, to_date, to_hour){
    return new Conference(name, from_date, from_hour, to_date, to_hour);
  }

  send_article_to_review(article, reviewer){
    var reviewer_role = reviewer.find_role('Revisor')
    if (reviewer_role) {
      article.process_add_to_pending(reviewer);
    }else{
      throw new Error('El usuario que se asigno no es revisor de esta sesión');
    } 
  }

}

module.exports = Chair;