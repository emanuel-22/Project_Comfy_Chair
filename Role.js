class Role {

  constructor(user) {
    this._user = user;
  }

  user(){
    return this._user;
  }

  name(){
    throw new Error('Este método se implementa en la subclase');
  }

  create_conference(name, start_date, start_time, end_date, end_time){
    throw new Error('Este método se implementa en la subclase');
  }

  send_article_to_review(article, session, reviewer){
    throw new Error('Este método se implementa en la subclase');
  }

  define_num_max_accepted(session, num){
    throw new Error('Este método se implementa en la subclase');
  }

  send_bids(article, session, bid){
    throw new Error('Este método se implementa en la subclase');
  }

  send_score(article, session, score, text){
    throw new Error('Este método se implementa en la subclase');
  }
  send_article(article, session, send_date){
    throw new Error('Este método se implementa en la subclase');
  }
 
}

module.exports = Role;