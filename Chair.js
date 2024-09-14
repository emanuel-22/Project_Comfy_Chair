const Conference = require('./Conference.js');
const Role = require('./Role.js');

class Chair extends Role {

  constructor(user) {
    super(user);
  }

  name(){
    return 'Chair';
  }
  
  create_conference(name, start_date, start_time, end_date, end_time){
    return new Conference(name, start_date, start_time, end_date, end_time);
  }

  send_article_to_review(article, session, reviewer){
    var reviewer_role = reviewer.find_role('Revisor')
    if (reviewer_role) {
      session.assign_reviewer_to_bid(article, reviewer);
    }else{
      throw new Error('El usuario que se asigno no tiene rol de revisor');
    } 
  }

  define_num_max_accepted(session, num){
    session.define_num_max_accepted(num);
  }
  
}

module.exports = Chair;