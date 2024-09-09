const RegularSession = require('./RegularSession.js');
const WorkshopSession = require('./WorkshopSession.js');
const PosterSession = require('./PosterSession.js');
const Session = require('./Session.js');

class Conference {
  
  constructor(name, start_date, start_time, end_date, end_time) {
    this._name = name;
    this._start_date = start_date;
    this._start_time = start_time;
    this._end_date = end_date;
    this._end_time = end_time;
    
    this._sessions = [];
    this._chairs = [];
    this._program_committee = [];
  }

  name(){
    return this._name;
  }

  start_date(){
    return this._start_date;
  }

  end_date(){
    return this._end_date;
  }

  get_details() {
    this._sessions.forEach(session => session.getD_details());
  }

  sessions(){
    return this._sessions;
  }

  chairs(){
    return this._chairs;
  }

  program_committee(){
    return this._program_committee;
  }

  // Este es un methodo Factory
  create_session(session_name, session_type, reception_deadline){
    switch (session_type) {
      case 'Sesion Regular':
        return new Session(session_name, new RegularSession(), reception_deadline);
      case 'Sesion Workshop':
        return new Session(session_name, new WorkshopSession(), reception_deadline);
      case 'Sesion Poster':
        return new Session(session_name, new PosterSession(), reception_deadline);
      default:
        throw new Error('No se reconoce este tipo de sesion');
    }
  }

  has_session(session_name, session_type){
    return this._sessions.some(
      session => (
        session.topic_name() === session_name && session.session_type().name() === session_type
      )
    );
  }

  find_session(session_name, session_type){
    return this._sessions.find(
      session => (
        session.topic_name() === session_name && session.session_type().name() === session_type
      )
    );
  }
  
  add_session(session_name, session_type, reception_deadline){
    let error_message = '';
    if(this.has_session(session_name, session_type)){
      error_message = 'Este tipo de session con este nombre ya fue agregado a la conferencia'
    }  
    if (this.find_session(session_name, session_type)) {
      error_message = 'No se reconoce este tipo de sesión'
    }
    if (error_message) {
      throw new Error(error_message.trim());
    }else{
      const session = this.create_session(session_name, session_type, reception_deadline)
      this._sessions.push(session);
    } 
  }

  has_chair(user){
    return this._chairs.some(
      chair => chair && (chair.user()===user)
    );
  }

  add_chairs(user){
    if(!this.has_chair(user)){
      if(!user.has_role('Chair')){
        user.add_role('Chair')
      }
      const chair = user.find_role('Chair')
      this._chairs.push(chair);
    }else{
      throw new Error('Este usuario ya se encuentra en la lista de chairs de la conferencia');
    }
  }

  has_reviewer(user){
    return this._program_committee.some(reviewer => reviewer && (reviewer.user()===user));
  }

  add_program_committee(user){
    if(!this.has_reviewer(user)){
      if(!user.has_role('Revisor')){
        user.add_role('Revisor')
      }
      const reviewer = user.find_role('Revisor')
      this._program_committee.push(reviewer);
    }else{
      throw new Error('Este usuario ya se encuentra en el comité del programa de la conferencia');
    }
  }

}

module.exports = Conference;